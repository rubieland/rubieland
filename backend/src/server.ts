import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const { PORT = 9000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Server is running yay!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
