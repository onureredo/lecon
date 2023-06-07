import { Router } from 'express';
import { getUser } from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/:username', getUser);

export default userRouter;
