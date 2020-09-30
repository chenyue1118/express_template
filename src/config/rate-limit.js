const rateLimit = require('express-rate-limit');

module.exports = {
  api: rateLimit({
    max: 100,  // limit each IP to 100 requests per windowMs
    windowMs: 15 * 60 * 1000  // 15 minutes
  })
}
