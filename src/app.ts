import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import { notFound } from './app/middlewares/notFound';
import cookieSession from 'cookie-session';
import config from './app/config';

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://form-ai-builder.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
);
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.SESSION_SECRET as string],
  }),
);
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello AI Form Builder!');
});

app.use(notFound);

app.use(globalErrorHandler);

export default app;
