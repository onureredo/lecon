import { Router } from 'express';
import { getAll, getUser } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/', getAll);
userRouter.get('/:username', getUser);

export default userRouter;
