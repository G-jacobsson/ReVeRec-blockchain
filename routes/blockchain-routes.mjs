import express from 'express';
import {
  addJobAd,
  addNewBlock,
  getBlockchain,
  getJobAd,
  getLatestBlock,
  updateJobAd,
} from '../controllers/blockchain-controller.mjs';

const blockchainRouter = express.Router();

blockchainRouter.route('/').get(getBlockchain);

blockchainRouter.route('/latest').get(getLatestBlock);

blockchainRouter.route('/jobs').post(addJobAd, addNewBlock);

blockchainRouter.route('/jobs/:id').get(getJobAd).put(updateJobAd);

export default blockchainRouter;
