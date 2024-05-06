import express from 'express';
import blockchainRouter from './routes/blockchain-routes.mjs';
import candidateRouter from './routes/candidate-routes.mjs';

const PORT = process.argv[2];

const app = express();

app.use(express.json());

app.use('/api/v1/reverec', blockchainRouter);
app.use('/api/v1/candidates', candidateRouter);

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
