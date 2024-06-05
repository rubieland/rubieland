import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const { APP_HOST, APP_PORT, CLIENT_HOST, CLIENT_PORT } = process.env;

const app = express();

// ----- middlewares ----- \\
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://${CLIENT_HOST ?? 'localhost'}:${CLIENT_PORT ?? 5173}`,
  })
);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Server is running yay!' });
});

app.listen(APP_PORT, () => {
  console.log(
    `Server is running on http://${APP_HOST ?? 'localhost'}:${APP_PORT ?? 9000}`
  );
});
