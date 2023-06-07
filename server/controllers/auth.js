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
    bio,
    profileImage,
    bgImage,
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
    bio,
    profileImage,
    bgImage,
  });
  const token = jwt.sign({ uid: newUser._id }, process.env.JWT_SECRET);
  res.status(201).send({ token });
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
  res.status(200).send({ token });
});

// Get User
export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.uid);
  res.json(user);
});
