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

const addNewBlock = (req, res, next) => {
  const newBlockData = {
    jobAd: req.jobAd,
  };
  const newBlock = blockchain.addNewBlock(newBlockData);
  res.status(201).json({ success: true, statusCode: 201, data: newBlock });
};

export { getBlockchain, addNewBlock, getLatestBlock };
