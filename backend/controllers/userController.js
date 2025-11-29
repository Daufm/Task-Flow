
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js"; // You need to implement this




export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      // If an account with this email exists, update it instead of inserting
      // a new row. This prevents ER_DUP_ENTRY while allowing intentional
      // re-submissions for testing — we overwrite username/password and
      // reset verification state.
      existingUser.username = username || existingUser.username;
      existingUser.password = hashedPassword; // will be defined below
      const verificationCode = crypto.randomBytes(3).toString("hex");
      existingUser.verified = false;
      existingUser.verificationCode = verificationCode;
      await existingUser.save();

      // Send verification code to email
      await sendEmail(
        email,
        "Verification Code",
        `Your verification code is: ${verificationCode}`
      );

      return res
        .status(200)
        .json({ message: "Existing user updated and verification code sent" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomBytes(3).toString("hex"); // 6-digit code
   
     //create user with verified false and store verification code
     await User.create({
      username,
      email,
      password: hashedPassword,
      verified: false,
      verificationCode,
    });

    // Send verification code to email
    await sendEmail( 
          email,
        "Verification Code",
        `Your verification code is: ${verificationCode}`
    );

    return res.status(201).json({ message: "Verification code sent to your email",  });
  } catch (error) {
    console.error("Error during signup:", error);
    // Handle duplicate email (unique constraint) gracefully so tests
    // that intentionally try to insert a duplicate get a clear response.
    // Sequelize unique constraint errors usually have name 'SequelizeUniqueConstraintError'
    // and mysql2 low-level errors include original.code === 'ER_DUP_ENTRY'.
    if (
      error &&
      (error.name === "SequelizeUniqueConstraintError" ||
        (error.original && error.original.code === "ER_DUP_ENTRY"))
    ) {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(500).json({ message: "Internal server error" });
  }
};


export const verify = async (req, res) => {
    const {email, code} = req.body;
    

    try {
        const user = await User.findOne({where: {email}});
        if(!user) {
            return res.status(400).json({message: "User not found"});
        }
        if(code === user.verificationCode) {
            user.verified = true;
            user.verificationCode = null;
            await user.save();
            return res.status(200).json({message: "User verified successfully"});
        }
    } catch (error) {
        console.error("Error during verification:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
//  console.log("JWT_SECRET:", process.env.JWT_SECRET);
//  console.log("All env:", process.env);

    const secret = process.env.JWT_SECRET;
  

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
    
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isVerified = user.verified;
      
      if (!isVerified) {
        return res.status(403).json({ message: "User not verified" });
      }
        // Generate JWT
      if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }
      
      const token = jwt.sign({ id: user.id }, secret, {
        expiresIn: "5h",
      });
      
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}