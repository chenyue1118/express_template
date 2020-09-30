// module dependencies
require('module-alias/register');
const config = require('@cc/config/index');
const logger = require('@cc/config/logger');
const app = require('@cc/config/express');

logger.info('config: ' + JSON.stringify(config));

// start the server
app.listen(config.serverPort, () => {
  logger.info('server starts on port ' + config.serverPort)
})

module.exports = app;
