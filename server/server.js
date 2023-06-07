import './database/db.js';
import express from 'express';
import cors from 'cors';
import authRouter from './routes/authRouter.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/auth', authRouter);
// app.use('*', (req, res) => res.sendStatus(419));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
