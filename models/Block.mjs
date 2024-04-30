import { createHash } from '../utils/crypto-lib.mjs';

export default class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return createHash(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    );
  }
}
