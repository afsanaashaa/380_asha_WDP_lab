// logger.js (in root)
const { createLogger, format, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join('logs', 'error.log') })
  ]
});

module.exports = logger;