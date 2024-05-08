import express from 'express';
import {
  addNewBlock,
  broadcast,
  getBlockchain,
  getLatestBlock,
} from '../controllers/blockchain-controller.mjs';

const blockchainRouter = express.Router();

blockchainRouter.route('/').get(getBlockchain).post(addNewBlock);

blockchainRouter.route('/latest').get(getLatestBlock);

blockchainRouter.route('/broadcast').post(broadcast);

export default blockchainRouter;
