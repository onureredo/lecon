import { Router } from 'express';
import { signUp, signIn, getUser } from '../controllers/auth.js';

const authRouter = Router();

authRouter.post('/register', signUp);
authRouter.post('/login', signIn);

export default authRouter;
