import { Router } from 'express';
import {
  getAll,
  getUser,
  followUser,
  unfollowUser,
} from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/', getAll);
userRouter.get('/:username', getUser);
userRouter.put('/:id/follow', verifyToken, followUser);
userRouter.put('/:id/unfollow', verifyToken, unfollowUser);

export default userRouter;
