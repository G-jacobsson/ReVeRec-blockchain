import Block from './Block.mjs';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, new Date(), 'Genesis Block', '0');
  }
}
