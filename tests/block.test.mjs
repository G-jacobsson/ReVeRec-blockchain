import { describe, it, expect } from 'vitest';
import Block from '../models/Block.mjs';
import { createHash } from '../utils/crypto-lib.mjs';

describe('Block', () => {
  it('should create a new block', () => {
    const block = new Block(0, Date.now(), 'data', 'previousHash', 2, 0);

    expect(block).toBeInstanceOf(Block);
    expect(block.data).toBe('data');
  });

  it('should calculate a hash', () => {
    const index = 0;
    const timestamp = Date.now();
    const data = 'data';
    const previousHash = 'previousHash';
    const difficulty = 2;
    const nonce = 0;
    const block = new Block(
      index,
      timestamp,
      data,
      previousHash,
      difficulty,
      nonce
    );

    const expectedHash = createHash(
      index +
        previousHash +
        timestamp +
        JSON.stringify(data) +
        nonce +
        difficulty
    );

    expect(block.hash).toBe(expectedHash);
  });
});
