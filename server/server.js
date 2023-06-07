import express from 'express';
import cors from 'cors';
import './database/db.js';

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('*', (req, res) => res.sendStatus(404));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
