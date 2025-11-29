import dotenv from 'dotenv';
import path from 'path';
import sequelize from '../db/db.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

// Load backend .env
dotenv.config({ path: path.resolve('./backend/.env') });

const [,, email, newPassword] = process.argv;

if (!email || !newPassword) {
  console.error('Usage: node backend/scripts/resetPassword.js <email> <newPassword>');
  process.exit(1);
}

(async () => {
  try {
    await sequelize.authenticate();

    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('User not found:', email);
      process.exit(1);
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    // Optionally reset verification fields if you want
    user.verified = user.verified || false;
    await user.save();

    console.log(`Password updated for ${email}`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating password:', err);
    process.exit(1);
  }
})();
