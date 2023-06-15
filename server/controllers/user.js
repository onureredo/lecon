import Post from '../models/Post.js';
import User from '../models/User.js';
import asyncHandler from '../utils/asynchHandler.js';
import ErrorResponse from '../utils/ErrorResponse.js';

export const getAll = asyncHandler(async (req, res, next) => {
  const users = await User.find()
    .select('-email')
    .populate('firstName lastName username bio profileImage bgImage');

  res.send(users);
});

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

// FOLLOW & UNFOLLOW
export const followUser = asyncHandler(async (req, res, next) => {
  const userToFollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.uid);

  if (!userToFollow) {
    throw new ErrorResponse(
      `User with id of ${req.params.id} does not exist.`,
      404
    );
  }

  if (userToFollow.followers.includes(req.uid)) {
    throw new ErrorResponse('You are already following this user', 400);
  }

  userToFollow.followers.push(req.uid);
  currentUser.following.push(req.params.id);
  await userToFollow.save();
  await currentUser.save();

  const updatedUserToFollow = await User.findById(req.params.id).select(
    '-password -email'
  );

  res
    .status(200)
    .json({
      success: `Followed user with id of ${req.params.id}`,
      user: updatedUserToFollow,
    });
});

export const unfollowUser = asyncHandler(async (req, res, next) => {
  const userToUnfollow = await User.findById(req.params.id);
  const currentUser = await User.findById(req.uid);

  if (!userToUnfollow) {
    throw new ErrorResponse(
      `User with id of ${req.params.id} does not exist.`,
      404
    );
  }

  if (!userToUnfollow.followers.includes(req.uid)) {
    throw new ErrorResponse('You are not following this user', 400);
  }

  const followerIndex = userToUnfollow.followers.indexOf(req.uid);
  const followingIndex = currentUser.following.indexOf(req.params.id);
  userToUnfollow.followers.splice(followerIndex, 1);
  currentUser.following.splice(followingIndex, 1);
  await userToUnfollow.save();
  await currentUser.save();

  const updatedUserToUnfollow = await User.findById(req.params.id).select(
    '-password -email'
  );

  res
    .status(200)
    .json({
      success: `Unfollowed user with id of ${req.params.id}`,
      user: updatedUserToUnfollow,
    });
});
