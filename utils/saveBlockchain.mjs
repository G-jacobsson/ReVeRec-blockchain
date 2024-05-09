import fs from 'fs/promises';
import path from 'path';

export const saveBlockchain = async (blockchain) => {
  const blockchainJson = JSON.stringify(blockchain);
  const filePath = path.join(__appdir, 'data', 'reverecBlockchain.json');
  await fs.writeFile(filePath, blockchainJson);
};
