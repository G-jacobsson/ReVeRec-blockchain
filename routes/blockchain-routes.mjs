import express from 'express';
import {
  addNewBlock,
  getBlockchain,
  getLatestBlock,
} from '../controllers/blockchain-controller.mjs';

const blockchainRouter = express.Router();

blockchainRouter.route('/').get(getBlockchain).post(addNewBlock);

blockchainRouter.route('/latest').get(getLatestBlock);

export default blockchainRouter;
