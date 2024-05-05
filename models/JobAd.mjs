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
}
