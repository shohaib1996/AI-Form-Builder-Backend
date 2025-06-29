import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';


const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello AI Form Builder!');
});

export default app;