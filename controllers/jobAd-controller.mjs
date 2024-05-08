import { JobAd } from '../models/JobAd.mjs';
import { blockchain } from '../startup.mjs';

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

    const newBlockData = {
      jobAd: jobAd,
    };

    req.newBlockData = newBlockData;
    next();
  }
};

const getJobAd = (req, res, next) => {
  const id = req.params.id;
  const jobAds = JobAd.findAllJobAds(id);

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
  console.log(`Searching for job ad with ID: ${id}`);
  const jobAd = JobAd.findJobAd(id);
  console.log(`Found job ad: ${JSON.stringify(jobAd)}`);

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
  req.jobAd = updatedJobAd;

  const updatedBlockData = {
    jobAd: updatedJobAd,
  };
  req.updatedBlockData = updatedBlockData;
  next();
};

export { addJobAd, getJobAd, updateJobAd };
