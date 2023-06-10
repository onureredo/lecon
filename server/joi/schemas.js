import Joi from 'joi';

export const signUpSchema = Joi.object({
  firstName: Joi.string().max(16).required(),
  lastName: Joi.string().max(16).required(),
  username: Joi.string().max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  profileImage: Joi.string().allow('', null),
  bgImage: Joi.string().allow('', null),
  bio: Joi.string().allow('', null),
  location: Joi.string().max(12).allow('', null),
});

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const postSchema = Joi.object({
  author: Joi.string().length(24).required(),
  content: Joi.string().max(200).required(),
  parentPost: Joi.string().length(24).allow('', null),
  hashtags: Joi.array().items(Joi.string()).optional().allow(null),
});
