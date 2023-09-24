import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import assetsRoutes from './src/routes/assetRoutes';
import { errorMiddleware } from './src/middlewares/errorMiddleware';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.json({ info: 'App is running!' });
});

app.use('/assets', assetsRoutes);

app.use(errorMiddleware);

export default app;
