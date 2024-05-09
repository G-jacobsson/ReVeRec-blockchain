import express from 'express';
import blockchainRouter from './routes/blockchain-routes.mjs';
import candidateRouter from './routes/candidate-routes.mjs';
import jobAdRouter from './routes/jobAd-routes.mjs';
import errorHandler from './middleware/errorHandler.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.argv[2] || process.env.PORT;

const app = express();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

global.__appdir = dirname;

app.use(express.json());

app.use('/api/v1/reverec', blockchainRouter);
app.use('/api/v1/reverec/candidates', candidateRouter);
app.use('/api/v1/reverec/jobs', jobAdRouter);

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
