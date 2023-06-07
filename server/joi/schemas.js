import Joi from 'joi';

export const signUpSchema = Joi.object({
  firstName: Joi.string().max(16).required(),
  lastName: Joi.string().max(16).required(),
  username: Joi.string().max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  bio: Joi.string().optional(),
  profileImage: Joi.string().optional(),
  bgImage: Joi.string().optional(),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const postSchema = Joi.object({
  author: Joi.string().length(24).required(), // Mongoose object IDs are always 24 characters
  content: Joi.string().max(200).required(),
  parentPost: Joi.string().length(24).optional(),
  hashtags: Joi.array().items(Joi.string()).optional(),
});
