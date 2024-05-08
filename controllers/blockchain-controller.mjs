import { blockchain } from '../startup.mjs';

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
  const newBlockData = {
    jobAd: req.jobAd,
  };
  console.log('JobAd', newBlockData);
  const newBlock = blockchain.addNewBlock(req.newBlockData);

  blockchain.candidateNodes.forEach(async (url) => {
    const body = newBlock;
    await fetch(`${url}/api/v1/reverec/broadcast`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
  res.status(201).json({ success: true, statusCode: 201, data: newBlock });
};

const broadcast = (req, res, next) => {
  console.log('Broadcast function was called');
  const newBlock = req.body;
  console.log(newBlock);
  const latestBlock = blockchain.getLatestBlock();
  const hash = latestBlock.hash === newBlock.previousHash;
  const index = latestBlock.index + 1 === newBlock.index;
  console.log('hash check', hash);
  console.log('index check', index);
  console.log('New block', newBlock);
  console.log('Latest Block', latestBlock);

  if (hash && index) {
    blockchain.chain.push(newBlock);
    res.status(201).json({
      success: true,
      statusCode: 201,
      data: { message: 'The new block is added and broadcasted' },
    });
  } else {
    res.status(500).json({
      success: false,
      statusCode: 500,
      data: { message: 'The new block was rejected and not broadcasted' },
    });
  }
};

const synchronizeChain = async (req, res, next) => {
  try {
    blockchain.candidateNodes.forEach(async (newNodeUrl) => {
      const response = await fetch(`${newNodeUrl}/api/v1/reverec`);
      const { data: newNodeBlockchain } = await response.json();

      if (newNodeBlockchain.length > blockchain.chain.length) {
        blockchain.chain = newNodeBlockchain;
      }
    });
  } catch (error) {
    console.error('Error synchronizing chain:', error);
  }
};

export {
  getBlockchain,
  addNewBlock,
  getLatestBlock,
  broadcast,
  synchronizeChain,
};
