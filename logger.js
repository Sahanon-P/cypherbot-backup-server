import {createLogger, format, transports} from 'winston';
import fs from 'fs';
import path from 'path';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const accessfilename = path.join(logDir, 'access.log');
const errorfilename = path.join(logDir, 'error.log');

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  format.json()
);

const options = {
  protocol: 'unix',
  path: '/var/run/syslog',
};

const logTransports = [
  new transports.Console({
    level: 'info',
    format: format.combine(
      format.colorize(),
      format.printf(
        info => `${info.timestamp} ${info.level}: ${info.message}`
      )
    )
  }),
  new transports.File({
    filename: errorfilename,
    level: 'error',
  }),
  new transports.File({ filename: accessfilename }),
];

const Logger = createLogger({
  format:logFormat,
  transports:logTransports,
});

export default Logger;