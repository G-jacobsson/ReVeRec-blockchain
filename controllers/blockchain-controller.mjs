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
  const newBlockData = {
    jobAd: req.jobAd,
  };
  const newBlock = blockchain.addNewBlock(newBlockData);
  res.status(201).json({ success: true, statusCode: 201, data: newBlock });
};

const addJobAd = (req, res, next) => {
  const { id, title, description, location, salaryRange, qualifications } =
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
    res.status(400).json({
      success: false,
      statusCode: 400,
      error:
        'Invalid job advertisement data. Required data is: title, description, location, salaryRange and qualifications.',
    });
  } else {
    const jobAd = new JobAd(
      id,
      title,
      description,
      location,
      salaryRange,
      qualifications
    );
    req.jobAd = jobAd;
    next();
  }
};

const getJobAd = (req, res, next) => {
  const id = req.params.id;
  const jobAds = blockchain.findAllJobAds(id);

  if (jobAds.length === 0) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'No job advertisements found with the provided ID.',
    });
  }

  res.status(200).json({ success: true, statusCode: 200, data: jobAds });
};

const updateJobAd = (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;
  const jobAd = blockchain.findJobAd(id);

  if (!jobAd) {
    return res.status(404).json({
      success: false,
      statusCode: 404,
      error: 'No job advertisement found with the provided ID.',
    });
  }

  const updatedJobAd = new JobAd(
    jobAd.id,
    updatedData.title || jobAd.title,
    updatedData.description || jobAd.description,
    updatedData.location || jobAd.location,
    updatedData.salaryRange || jobAd.salaryRange,
    updatedData.qualifications || jobAd.qualifications,
    'updated',
    jobAd.version + 1
  );

  const newBlock = blockchain.addNewBlock({ jobAd: updatedJobAd });
  res.status(204).json({ success: true, statusCode: 204, data: newBlock });
};

export {
  getBlockchain,
  addNewBlock,
  getLatestBlock,
  addJobAd,
  getJobAd,
  updateJobAd,
};
