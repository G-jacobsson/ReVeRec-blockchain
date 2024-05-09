import { blockchain } from '../startup.mjs';
import synchronizeChain from './blockchain-controller.mjs';

const listCandidates = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, statusCode: 200, data: blockchain.candidateNodes });
};

const registerCandidate = async (req, res, next) => {
  const node = req.body;

  if (
    blockchain.candidateNodes.indexOf(node.nodeUrl) === -1 &&
    blockchain.nodeUrl !== node.nodeUrl
  ) {
    blockchain.candidateNodes.push(node.nodeUrl);

    syncCandidates(node.nodeUrl);

    await synchronizeChain();

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {
        message: `Candidate ${node.nodeUrl} has now been registered`,
      },
    });
  } else {
    res.status(400).json({
      success: false,
      statusCode: 400,
      data: { message: `Candidate ${node.nodeUrl} is already registered` },
    });
  }
};

const syncCandidates = (url) => {
  const candidates = [...blockchain.candidateNodes, blockchain.nodeUrl];

  try {
    candidates.forEach(async (candidate) => {
      const body = { nodeUrl: candidate };
      await fetch(`${url}/api/v1/reverec/candidates/register-candidate`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export { listCandidates, registerCandidate };
