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
      difficulty: +process.env.DIFFICULTY,
    };
  }

  getLatestBlock() {
    return this.chain.at(-1);
  }

  addNewBlock(newBlockData) {
    console.log('Before adding new block', newBlockData);
    const latestBlock = this.getLatestBlock();
    const { nonce, difficulty, timestamp } = this.proofOfWork(
      latestBlock.hash,
      newBlockData
    );
    const newBlock = new Block(
      latestBlock.index + 1,
      timestamp,
      newBlockData,
      latestBlock.hash,
      difficulty,
      nonce
    );
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
    console.log('After adding new block:', newBlock);
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
        currentBlockData.previousHash,
        currentBlockData.difficulty
      );
      const previousBlock = new Block(
        previousBlockData.index,
        previousBlockData.timestamp,
        previousBlockData.data,
        previousBlockData.previousHash,
        previousBlockData.difficulty
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

  proofOfWork(previousHash, data) {
    const latestBlock = this.getLatestBlock();
    let difficulty, hash, timestamp;
    let nonce = 1024;

    do {
      nonce++;
      timestamp = Date.now();

      difficulty = this.difficultyAdjustment(latestBlock, timestamp);
      const newBlock = new Block(
        latestBlock.index,
        previousHash,
        timestamp,
        data,
        nonce,
        difficulty
      );
      hash = newBlock.calculateHash();
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return { nonce, difficulty, timestamp };
  }

  difficultyAdjustment(latestBlock, timestamp) {
    const MINE_RATE = process.env.MINE_RATE;
    let { difficulty } = latestBlock;

    if (difficulty < 1) return 1;

    return timestamp - latestBlock.timestamp > MINE_RATE
      ? +difficulty + 1
      : +difficulty - 1;
  }
}
