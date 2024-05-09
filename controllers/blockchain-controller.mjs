import { blockchain } from '../startup.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';
import { saveBlockchain } from '../utils/saveBlockchain.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, statusCode: 200, data: blockchain });
};

const getLatestBlock = (req, res, next) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    data: blockchain.getLatestBlock(),
  });
};

const addNewBlock = async (req, res, next) => {
  console.log('addNewBlock called');
  const newBlockData = {
    jobAd: req.jobAd,
  };
  const newBlock = blockchain.addNewBlock(newBlockData);

  blockchain.candidateNodes.forEach(async (url) => {
    console.log(`Broadcasting new block to ${url}`);
    const body = newBlock;
    await fetch(`${url}/api/v1/reverec/broadcast`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

  await saveBlockchain(blockchain);

  res.status(201).json({ success: true, statusCode: 201, data: newBlock });
};

const broadcast = (req, res, next) => {
  const newBlock = req.body;
  const latestBlock = blockchain.getLatestBlock();
  const hash = latestBlock.hash === newBlock.previousHash;
  const index = latestBlock.index + 1 === newBlock.index;

  if (hash && index) {
    blockchain.chain.push(newBlock);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: { message: 'The new block is added and broadcasted' },
    });
  } else {
    return next(
      new ErrorResponse('The new block was rejected and not broadcasted', 500)
    );
  }
};

const synchronizeChain = async () => {
  const currentLength = blockchain.chain.length;
  let maxLength = currentLength;
  let longestChain = null;

  for (const nodeUrl of blockchain.candidateNodes) {
    try {
      const response = await fetch(`${nodeUrl}/api/v1/reverec`);
      const { data: newNodeBlockchain } = await response.json();

      if (newNodeBlockchain.chain.length > maxLength) {
        maxLength = newNodeBlockchain.chain.length;
        longestChain = newNodeBlockchain.chain;
      }
    } catch (error) {
      throw new Error();
    }
  }

  if (longestChain && blockchain.validateChain(longestChain)) {
    blockchain.chain = longestChain;
  }
};

export {
  getBlockchain,
  addNewBlock,
  getLatestBlock,
  broadcast,
  synchronizeChain,
};
