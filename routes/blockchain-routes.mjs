import express from 'express';
import {
  addNewBlock,
  getBlockchain,
  getJobAd,
  getLatestBlock,
} from '../controllers/blockchain-controller.mjs';

const blockchainRouter = express.Router();

blockchainRouter.route('/').get(getBlockchain);

blockchainRouter.route('/latest').get(getLatestBlock);

blockchainRouter.route('/jobs').post(addNewBlock);

blockchainRouter.route('/jobs/:id').get(getJobAd);

export default blockchainRouter;
