import UserModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await UserModel.findOne({ email });
  if (exists) return res.json({ success: false, message: 'User Already Exists' });

  if (!validator.isEmail(email)) return res.json({ success: false, message: 'Invalid email' });
  if (password.length < 8) return res.json({ success: false, message: 'Password too short' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await UserModel.create({ name, email, password: hashedPassword });
  const token = createToken(user._id);
  res.json({ success: true, token });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return res.json({ success: false, message: "User doesn't exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    const token = createToken(user._id);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
});

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: "Invalid Admin Credentials" });
  }
});
