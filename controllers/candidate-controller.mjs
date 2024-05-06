import { blockchain } from '../startup.mjs';

const listCandidates = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, statusCode: 200, data: blockchain.candidateNodes });
};

const registerCandidate = (req, res, next) => {
  const node = req.body;

  if (
    blockchain.candidateNodes.indexOf(node.nodeUrl) === -1 &&
    blockchain.nodeUrl !== node.nodeUrl
  ) {
    blockchain.candidateNodes.push(node.nodeUrl);

    const newBlockData = {
      candidate: node,
    };
    const newBlock = blockchain.addNewBlock(newBlockData);

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {
        message: `Candidate ${node.nodeUrl} is registered`,
        block: newBlock,
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

export { listCandidates, registerCandidate };
