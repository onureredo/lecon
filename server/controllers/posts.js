import Post from '../models/Post.js';
import asyncHandler from '../utils/asynchHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';
import { postSchema } from '../joi/schemas.js';

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find()
    .populate('comments', 'content  createdAt')
    .populate('author', 'username firstName lastName profileImage')
    .sort({ createdAt: -1 })
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select:
          'username firstName lastName profileImage bgImage bio createdAt',
      },
    });

  res.json(posts);
});

export const getSinglePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const post = await Post.findById(id)
    .populate('comments', 'content  createdAt')
    .populate('author', 'username firstName lastName profileImage')
    .populate({
      path: 'comments',
      populate: {
        path: 'author',
        select:
          'username firstName lastName profileImage bgImage bio createdAt',
      },
    });

  if (!post)
    throw new ErrorResponse(`Post with id of ${id} does not exist.`, 404);
  res.send(post);
});

export const createPost = asyncHandler(async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) throw new ErrorResponse(error.details[0].message, 400);

  const { body, uid } = req;
  const newPost = await (
    await Post.create({ ...body, author: uid })
  ).populate('author', 'username firstName lastName profileImage');
  res.status(201).json(newPost);
});

export const updatePost = asyncHandler(async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) throw new ErrorResponse(error.details[0].message, 400);

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

export const likePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    uid,
  } = req;
  const post = await Post.findById(id);
  if (!post) {
    throw new ErrorResponse(`Post with id of ${id} does not exist.`, 404);
  }
  if (post.likes.includes(uid)) {
    throw new ErrorResponse('You have already liked this post', 400);
  }
  post.likes.push(uid);
  await post.save();
  res.status(200).json({ success: `Liked post with id of ${id}` });
});

export const unlikePost = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
    uid,
  } = req;
  const post = await Post.findById(id);
  if (!post) {
    throw new ErrorResponse(`Post with id of ${id} does not exist.`, 404);
  }
  if (!post.likes.includes(uid)) {
    throw new ErrorResponse('You have not liked this post', 400);
  }
  const index = post.likes.indexOf(uid);
  if (index > -1) {
    post.likes.splice(index, 1);
  }
  await post.save();
  res.status(200).json({ success: `Unliked post with id of ${id}` });
});
