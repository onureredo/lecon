import { Router } from 'express';
import { signUp, signIn, getUser, logOut } from '../controllers/auth.js';
import verifyToken from '../middlewares/verifyToken.js';

const authRouter = Router();

authRouter.post('/register', signUp);
authRouter.post('/login', signIn);
authRouter.get('/logout', logOut);
authRouter.get('/me', verifyToken, getUser);

export default authRouter;
