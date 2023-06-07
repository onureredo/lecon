import Post from '../models/Post.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asynchHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate('author', 'username firstName lastName profileImage')
    .sort({ createdAt: -1 });
  res.json(posts);
});

export const getSinglePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const post = await Post.findById(id).populate(
    'author',
    'username firstName lastName profileImage'
  );
  if (!post)
    throw new ErrorResponse(`Post with id of ${id} does not exist.`, 404);
  res.send(post);
});

export const createPost = asyncHandler(async (req, res, next) => {
  const { body, uid } = req;
  const newPost = await (
    await Post.create({ ...body, author: uid })
  ).populate('author', 'username firstName lastName profileImage');
  res.status(201).json(newPost);
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const {
    body,
    params: { id },
    uid,
  } = req;
  const found = await Post.findById(id);
  if (!found)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  if (uid !== found.author.toString())
    throw new ErrorResponse(`You have no permission to edit this post`, 401);
  const updatedPost = await (
    await Post.findOneAndUpdate({ _id: id }, body, { new: true })
  ).populate('author');
  res.json(updatedPost);
});

export const deletePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    uid,
  } = req;
  const found = await Post.findById(id);
  if (!found)
    throw new ErrorResponse(`Post with id of ${id} doesn't exist`, 404);
  if (uid !== found.author.toString())
    throw new ErrorResponse(`You have no permission to delete this post`, 401);
  await Post.deleteOne({ _id: id });
  res.json({ success: `Post with id of ${id} was deleted` });
});
