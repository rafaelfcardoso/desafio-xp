import express from 'express';
import router from './routes';
import 'express-async-errors';
import httpErrorMiddleware from './middleware/error.middleware';
import 'dotenv/config';


const app = express();

app.use(express.json());

app.use(router);

app.use(httpErrorMiddleware);

export default app;