import 'dotenv/config';

import { StatusCodes } from 'http-status-codes';
import app from './app';

const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Express + TypeScript')
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});