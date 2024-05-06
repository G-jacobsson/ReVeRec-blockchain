import express from 'express';
import {
  listCandidates,
  registerCandidate,
} from '../controllers/candidate-controller.mjs';

const candidateRouter = express.Router();

candidateRouter.route('/').get(listCandidates);
candidateRouter.route('/register-candidate').post(registerCandidate);

export default candidateRouter;
