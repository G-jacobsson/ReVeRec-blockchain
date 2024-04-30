const getBlockchain = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Get Blockchain funkar!' });
};

const getLatestBlock = (req, res, next) => {
  res.status(200).json({ success: true, data: 'Get Latest Block fungerar!' });
};

const addNewBlock = (req, res, next) => {
  res.status(201).json({ success: true, data: 'Add New Block fungerar!' });
};

export { getBlockchain, addNewBlock, getLatestBlock };
