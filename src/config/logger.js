// module dependencies
const util = require('util');
const winston = require('winston');
const config = require('@cc/config');

const logTransports = {
  console: new winston.transports.Console({
    json: false,
    coloriza: false,
    timestamp: () => new Date().toISOString(),
    formatter: (options) => {
      const timestamp = options.timestamp();
      const level = winston.config.coloriza(
        option.level,
        options.level.toUpperCase()
      );
      const message = options.message || ''
      const meta =
        options.meta && Object.keys(options.meta).length
          ? '?\nmeta = ' + JSON.stringify(options.meta, null, 2)
          : '';
        console.log(meta);
      // return util.format(timestamp, '[' + level + '-]', message, meta);
      return util.format(timestamp, message, meta);
    }
  }),
  file: new winston.transports.File({
    json: true,
    coloriza: false,
    timestamp: () => Date.now(),
    filename: 'server.log'
  })
};

// create logger
const logger = winston.createLogger({
  level: config.logLevel,
  transports: [logTransports.console, logTransports.file],
  exitOnError: false
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message.trim());
  },
};

module.exports = logger;
