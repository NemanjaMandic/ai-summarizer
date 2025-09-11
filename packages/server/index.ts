import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 1389;

app.get('/', (req: Request, res: Response) => {
  res.send(`Zdravo sveeeteee! ${process.env.OPENAI_API_KEY}`);
});

app.get('/api/hello', (req: Request, res: Response) => {
  res.send(`Djesi kralju`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
