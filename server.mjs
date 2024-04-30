import express from 'express';
import dotenv from 'dotenv';
import blockchainRouter from './routes/blockchain-routes.mjs';

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

app.use('/api/v1/reverec', blockchainRouter);

const PORT = process.env.PORT || 5010;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
