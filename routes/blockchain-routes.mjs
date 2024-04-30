import express from 'express';
import {
  addNewBlock,
  getBlockchain,
  getLatestBlock,
} from '../controllers/blockchain-controller.mjs';

const blockchainRouter = express.Router();

blockchainRouter.route('/').get(getBlockchain);

blockchainRouter.route('/latest').get(getLatestBlock);

blockchainRouter.route('/mine').post(addNewBlock);

export default blockchainRouter;
