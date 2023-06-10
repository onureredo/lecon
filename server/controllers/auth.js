import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asynchHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import User from '../models/User.js';
import { signUpSchema, signInSchema } from '../joi/schemas.js';

// Register
export const signUp = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    profileImage,
    bgImage,
    bio,
    location,
  } = req.body;
  const { error } = signUpSchema.validate(req.body);
  if (error) throw new ErrorResponse(error.details[0].message, 400);
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new ErrorResponse('An account with this Email already exists.');
  const hash = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName,
    lastName,
    username,
    email,
    password: hash,
    profileImage,
    bgImage,
    bio,
    location,
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(201).json({ token });
});

// Login
export const signIn = asyncHandler(async (req, res, next) => {
  const { error } = signInSchema.validate(req.body);
  if (error) throw new ErrorResponse(error.details[0].message, 400);

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email }).select('+password');
  if (!existingUser) throw new ErrorResponse('User does not exist.', 404);
  const matchPassword = await bcrypt.compare(password, existingUser.password);
  if (!matchPassword) throw new ErrorResponse('Password is incorrect', 401);
  const token = jwt.sign({ uid: existingUser._id }, process.env.JWT_SECRET);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  res.status(200).send({ token });
});

// Logout
export const logOut = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully.' });
});

// Get User
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});
