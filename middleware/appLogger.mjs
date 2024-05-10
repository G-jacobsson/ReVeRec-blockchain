import fs from 'fs';
import path from 'path';

const appLogger = (req, res, next) => {
  const dirPath = path.join(__appdir, '/logs');
  const filePath = path.join(dirPath, 'request.log');

  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }

  next();

  if (res.statusCode < 400) {
    const logMessage = `Method: ${req.method} Url: ${
      req.originalUrl
    } Date: ${new Date().toLocaleDateString(
      'sv-SE'
    )} Time: ${new Date().toLocaleTimeString('sv-SE')}\n`;

    fs.appendFile(filePath, logMessage, (err) => {
      if (err) {
        console.error('Failed to write to file', err);
      }
    });
  }
};

export default appLogger;
