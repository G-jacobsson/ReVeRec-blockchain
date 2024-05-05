import Block from './Block.mjs';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return {
      index: 0,
      timestamp: Date.now(),
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
      Date.now(),
      newBlockData,
      latestBlock.hash
    );
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    return newBlock;
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
