import express from 'express';
import dotenv from 'dotenv';
import { Blockchain } from './models/Blockchain.mjs';

dotenv.config({ path: './config/config.env' });

const app = express();

const blockchain = new Blockchain();
console.log(blockchain);

const PORT = process.env.PORT || 5010;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
