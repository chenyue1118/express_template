const httpErrors = require('http-errors');
const statuses = require('statuses');

const createError = (exports = module.exports = (status, code, message) => {
  if (typeof message === 'object') {
    if ('message' in message) {
      message = message.message;
    } else {
      message = JSON.stringify(message);
    }
  }
  const error = httpErrors(statuses(status), message, { code });
  Error.captureStackTrace(error, createError);
  return error;
});
