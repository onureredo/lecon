import Post from '../models/Post.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asynchHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getUser = asyncHandler(async (req, res, next) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select('-password -email');

  if (!user) {
    throw new ErrorResponse(`User not found with username: ${username}`, 404);
  }

  const posts = await Post.find({ author: user._id })
    .select('-author')
    .sort({ createdAt: -1 });

  res.json({
    user,
    posts,
  });
});
