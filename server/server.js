import './database/db.js';
import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routes/authRouter.js';
import postsRouter from './routes/postsRouter.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT || 8000;

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://lecon.vercel.app'
        : 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/', userRouter);
app.use(errorHandler);
// app.use('*', (req, res) => res.sendStatus(419));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
