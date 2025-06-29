import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';


const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors())
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello AI Form Builder!');
});

app.use(notFound)

app.use(globalErrorHandler);


export default app;