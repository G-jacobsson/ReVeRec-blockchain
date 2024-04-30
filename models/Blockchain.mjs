import Block from './Block.mjs';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return {
      index: 0,
      timestamp: new Date(),
      data: 'Genesis Block',
      hash: '0',
    };
  }

  getLatestBlock() {
    return this.chain.at(-1);
  }

  addNewBlock(newBlockData) {
    const latestBlock = this.getLatestBlock();
    const newBlock = new Block(
      latestBlock.index + 1,
      new Date(),
      newBlockData,
      latestBlock.hash
    );
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }
}
