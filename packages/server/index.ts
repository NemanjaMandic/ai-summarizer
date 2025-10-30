import dotenv from 'dotenv';
import express from 'express';
import { PORT } from './constants';
import router from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
