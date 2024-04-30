const attachBlockchain = (blockchain) => {
  return (req, res, next) => {
    req.blockchain = blockchain;
    next();
  };
};

export default attachBlockchain;
