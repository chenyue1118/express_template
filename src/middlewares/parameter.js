const Joi = require('joi');
const createError = require('@cc/utils/error');

/*
 * 验证请求参数
 */
const validate = (schema) {
  return (req, res, next) => {
    Joi.validate(req.body, schema, (err, value) => {
      if (err) {
        next(createError('Bad Request', err.message));
      } else {
        req.originalBody = req.body;
        req.body = value;
        next();
      }
    })
  }
}

module.exports = { validate }
