import Block from './Block.mjs';

export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];

    this.candidateNodes = [];

    this.nodeUrl = process.argv[3];
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

  validateChain() {
    let isValid = true;

    for (let i = 1; i < this.chain.length; i++) {
      const currentBlockData = this.chain[i];
      const previousBlockData = this.chain[i - 1];

      const currentBlock = new Block(
        currentBlockData.index,
        currentBlockData.timestamp,
        currentBlockData.data,
        currentBlockData.previousHash
      );
      const previousBlock = new Block(
        previousBlockData.index,
        previousBlockData.timestamp,
        previousBlockData.data,
        previousBlockData.previousHash
      );

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        isValid = false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        isValid = false;
      }
    }

    return isValid;
  }
}
