// ./models/connection.ts
import * as dotenv from 'dotenv';

import mysql from 'mysql2/promise'; // instalar mysql2 e dotenv

// import dotenv from 'dotenv';

dotenv.config();

export default mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  user: process.env.MYSQL_USER || "Rafael",
  password: process.env.MYSQL_PASSWORD || "@Rfc180603",
  database: process.env.MYSQL_DATABASE || "desafio_xp"
});