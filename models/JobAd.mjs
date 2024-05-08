import { v4 as uuidv4 } from 'uuid';

export class JobAd {
  constructor(
    id = uuidv4().replaceAll('-', ''),
    title,
    description,
    location,
    salaryRange,
    qualifications,
    status = 'new',
    version = 1
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.location = location;
    this.salaryRange = salaryRange;
    this.qualifications = qualifications;
    this.status = status;
    this.version = version;
  }

  findJobAd(id) {
    for (let block of this.chain) {
      if (block.data && block.data.jobAd && block.data.jobAd.id === id) {
        return block.data.jobAd;
      }
    }

    return null;
  }

  findAllJobAds(id) {
    const jobAds = [];

    for (let block of this.chain) {
      if (block.data && block.data.jobAd && block.data.jobAd.id === id) {
        jobAds.push(block.data.jobAd);
      }
    }

    return jobAds;
  }
}
