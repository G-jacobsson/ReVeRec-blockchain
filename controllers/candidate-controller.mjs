import { blockchain } from '../startup.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';
import { synchronizeChain } from './blockchain-controller.mjs';

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

    try {
      await syncCandidates(node.nodeUrl);
    } catch (error) {
      return next(
        new ErrorResponse(
          `Couldnt register candidate at ${node.nodeUrl}. Node is inactive or misspelled at registration.`,
          500
        )
      );
    }

    try {
      await synchronizeChain();
    } catch (error) {
      return next(new ErrorResponse(`Syncronizing chain is not working`, 500));
    }

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {
        message: `Candidate ${node.nodeUrl} has now been registered`,
      },
    });
  } else {
    return next(
      new ErrorResponse(`Candidate ${node.nodeUrl} is already registered`, 500)
    );
  }
};

const syncCandidates = async (url) => {
  const candidates = [...blockchain.candidateNodes, blockchain.nodeUrl];

  for (const candidate of candidates) {
    try {
      const body = { nodeUrl: candidate };
      await fetch(`${url}/api/v1/reverec/candidates/register-candidate`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      throw new Error();
    }
  }
};

export { listCandidates, registerCandidate };
