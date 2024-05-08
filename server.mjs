import express from 'express';
import blockchainRouter from './routes/blockchain-routes.mjs';
import candidateRouter from './routes/candidate-routes.mjs';
import jobAdRouter from './routes/jobAd-routes.mjs';

const PORT = process.argv[2] || process.env.PORT;

const app = express();

app.use(express.json());

app.use('/api/v1/reverec', blockchainRouter);
app.use('/api/v1/reverec/candidates', candidateRouter);
app.use('/api/v1/reverec/jobs', jobAdRouter);

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
