import { v4 as uuidv4 } from 'uuid';
import { blockchain } from '../startup.mjs';

export class JobAd {
  constructor(
    id = uuidv4().replaceAll('-', ''),
    title,
    description,
    location,
    salaryRange,
    qualifications,
    responsibilities = [],
    applicationDeadline,
    contactInformation,
    status = 'new',
    version = 1
  ) {
    this.id = id;
    this.jobAdDetails = {
      title: title,
      description: description,
      location: location,
      salaryRange: salaryRange,
      qualifications: qualifications,
      additionalDetails: {
        responsibilities: responsibilities,
        applicationDeadline: applicationDeadline,
        contactInformation: contactInformation,
      },
    };
    this.status = status;
    this.version = version;
  }

  static findJobAd(id) {
    for (let block of blockchain.chain) {
      if (block.data && block.data.jobAd && block.data.jobAd.id === id) {
        return block.data.jobAd;
      }
    }

    return null;
  }

  static findAllJobAds(id) {
    const jobAds = [];

    for (let block of blockchain.chain) {
      if (block.data && block.data.jobAd && block.data.jobAd.id === id) {
        jobAds.push(block.data.jobAd);
      }
    }

    return jobAds;
  }
}
