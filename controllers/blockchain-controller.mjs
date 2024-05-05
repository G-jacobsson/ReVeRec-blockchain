import Block from '../models/Block.mjs';
import { JobAd } from '../models/JobAd.mjs';
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
  const { title, description, location, salaryRange, qualifications } =
    req.body;

  const requiredProperties = [
    'title',
    'description',
    'location',
    'salaryRange',
    'qualifications',
  ];
  const isValidJobAd = requiredProperties.every((prop) => prop in req.body);

  if (!isValidJobAd) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      error:
        'Invalid job advertisement data. Required data is: title, description, location, salaryRange and qualifications.',
    });
  } else {
    const jobAd = new JobAd(
      title,
      description,
      location,
      salaryRange,
      qualifications
    );
    const newBlockData = {
      jobAd,
    };
    const newBlock = blockchain.addNewBlock(newBlockData);
    res.status(201).json({ success: true, statusCode: 201, data: newBlock });
  }
};

const getJobAd = (req, res, next) => {
  const id = req.params.id;
  const jobAd = blockchain.findJobAd(id);

  if (!jobAd) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'No job advertisement found with the provided ID.',
    });
  }

  res.status(200).json({ success: true, statusCode: 200, data: jobAd });
};

export { getBlockchain, addNewBlock, getLatestBlock, getJobAd };
