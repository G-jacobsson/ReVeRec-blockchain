import express from 'express';
import {
  addJobAd,
  deleteJobAd,
  getJobAd,
  updateJobAd,
} from '../controllers/jobAd-controller.mjs';
import { addNewBlock } from '../controllers/blockchain-controller.mjs';

const jobAdRouter = express.Router();

jobAdRouter.route('/').post(addJobAd, addNewBlock);

jobAdRouter
  .route('/:id')
  .get(getJobAd)
  .put(updateJobAd, addNewBlock)
  .delete(deleteJobAd, addNewBlock);

export default jobAdRouter;
