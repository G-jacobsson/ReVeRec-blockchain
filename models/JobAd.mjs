import { v4 as uuidv4 } from 'uuid';

export class JobAd {
  constructor(title, description, location, salaryRange, qualifications) {
    this.id = uuidv4().replaceAll('-', '');
    this.title = title;
    this.description = description;
    this.location = location;
    this.salaryRange = salaryRange;
    this.qualifications = qualifications;
  }
}
