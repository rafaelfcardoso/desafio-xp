import express from 'express';
import 'express-async-errors';

import router from './routes';
import httpErrorMiddleware from './middlewares/error.middleware';
import 'dotenv/config';


const app = express();

app.use(express.json());

app.use(router);

app.use(httpErrorMiddleware);

export default app;