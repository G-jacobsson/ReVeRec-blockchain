import { JobAd } from '../models/JobAd.mjs';
import ErrorResponse from '../utils/ErrorResponse.mjs';

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
    return next(
      new ErrorResponse(
        'Invalid job advertisement data. Required data is: title, description, location, salaryRange and qualifications.',
        400
      )
    );
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
    return next(
      new ErrorResponse(
        'No job advertisements found with the provided ID.',
        404
      )
    );
  }

  res.status(200).json({ success: true, statusCode: 200, data: jobAds });
};

const updateJobAd = (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;
  const jobAd = JobAd.findJobAd(id);

  if (!jobAd) {
    return next(
      new ErrorResponse(
        'No job advertisements found with the provided ID.',
        404
      )
    );
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

const deleteJobAd = (req, res, next) => {
  const id = req.params.id;
  const jobAd = JobAd.findJobAd(id);

  if (!jobAd) {
    return next(
      new ErrorResponse(
        'No job advertisements found with the provided ID.',
        404
      )
    );
  }

  const deletedJobAd = {
    id: jobAd.id,
    status: 'deleted',
    version: jobAd.version + 1,
  };

  req.jobAd = deletedJobAd;

  const deletedBlockData = {
    jobAd: deletedJobAd,
  };

  req.deletedBlockData = deletedBlockData;
  next();
};

export { addJobAd, getJobAd, updateJobAd, deleteJobAd };
