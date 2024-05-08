import express from 'express';
import {
  addJobAd,
  getJobAd,
  updateJobAd,
} from '../controllers/jobAd-controller.mjs';
import { addNewBlock } from '../controllers/blockchain-controller.mjs';

const jobAdRouter = express.Router();

jobAdRouter.route('/').post(addJobAd, addNewBlock);

jobAdRouter.route('/:id').get(getJobAd).put(updateJobAd);

export default jobAdRouter;
