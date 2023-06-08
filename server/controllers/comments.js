import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import asyncHandler from '../utils/asynchHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const createComment = asyncHandler(async (req, res, next) => {
  const { content, author } = req.body;
  const { id: post } = req.params;

  // Create the new comment
  const comment = await Comment.create({ content, author, post });

  // Find the associated post and add the new comment to its comments array
  const associatedPost = await Post.findById(post);
  if (!associatedPost) {
    throw new ErrorResponse(`Post with id of ${post} does not exist.`, 404);
  }
  associatedPost.comments.push(comment._id);
  await associatedPost.save();

  res.status(201).json(comment);
});

export const getCommentsForPost = asyncHandler(async (req, res, next) => {
  const { id: postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .populate('author', 'username firstName lastName profileImage')
    .sort({ createdAt: -1 });

  res.status(200).json(comments);
});

export const updateComment = asyncHandler(async (req, res, next) => {
  const { content } = req.body;
  const { id: commentId } = req.params;
  const { uid } = req;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ErrorResponse(`Comment with id ${commentId} not found`, 404);
  }

  if (comment.author.toString() !== uid) {
    throw new ErrorResponse(`You have no permission to edit this comment`, 401);
  }

  comment.content = content;
  await comment.save();
  res.status(200).json(comment);
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  const { id: commentId } = req.params;
  const { uid } = req;

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ErrorResponse(`Comment with id ${commentId} not found`, 404);
  }

  if (comment.author.toString() !== uid) {
    throw new ErrorResponse(
      `You have no permission to delete this comment`,
      401
    );
  }

  await Comment.deleteOne({ _id: commentId });
  res.status(200).json({ success: `Comment with id ${commentId} was deleted` });
});
