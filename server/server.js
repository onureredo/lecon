import './database/db.js';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import postsRouter from './routes/postsRouter.js';
import commentsRouter from './routes/commentsRouter.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;

// app.use(
//   cors({
//     origin:
//       process.env.NODE_ENV === 'production'
//         ? process.env.CLIENT_URL
//         : process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postsRouter);
app.use('/posts', commentsRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
