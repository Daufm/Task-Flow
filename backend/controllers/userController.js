
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
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = crypto.randomBytes(3).toString("hex"); // 6-digit code
   
     //create user with verified false and store verification code
    const newUser = await User.create({
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

    return res.status(201).json({ message: "Verification code sent to your email" });
  } catch (error) {
    console.error("Error during signup:", error);
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
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error during login:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
}