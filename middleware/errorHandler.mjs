import fs from 'fs';
import path from 'path';

const errorHandler = (err, req, res, next) => {
  const filePath = path.join(__appdir, '/logs', 'error.log');
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  const message = `Method: ${req.method} Url: ${
    req.originalUrl
  } Date: ${new Date().toLocaleDateString()} Time: ${new Date().toLocaleTimeString()} - Message: ${
    err.message
  }\n`;

  fs.appendFile(filePath, message, (err) => {
    if (err) {
      console.error('Failed to write to file', err);
    }
  });

  res.status(err.statusCode).json({ success: false, message: err.message });
};

export default errorHandler;
