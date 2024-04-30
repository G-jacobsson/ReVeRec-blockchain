import Block from '../models/Block.mjs';
import { blockchain } from '../startup.mjs';

const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: blockchain });
};

const getLatestBlock = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Get Latest Block fungerar!' });
};

const addNewBlock = (req, res, next) => {
  const data = req.body;
  blockchain.addNewBlock(data);
  const newBlock = blockchain.getLatestBlock();
  res.status(201).json({ success: true, data: newBlock });
};

export { getBlockchain, addNewBlock, getLatestBlock };
