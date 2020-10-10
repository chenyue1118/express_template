// module dependencies
const Joi = require('joi');
const config = require('@cc/config');

// const tokenPostInputSchema = Joi.object()
//   .keys({
//     username: Joi.string()
//       .regex(/^[\w.-]+$/, 'username')
//       .required(),
//     password: Joi.string().min(6).required(),
//     expiration: Joi.number()
//       .integer()
//       .min(60)
//       .max(7 * 24 * 60 * 60)
//       .default(24 * 60 * 60),
//   })
//   .required();
const tokenPostInputSchema = Joi.object({
  username: Joi.string()
               .pattern(new RegExp(/^[\w.-]+$/))
               .min(3)
               .max(30)
               .required(),
  password: Joi.string()
               .min(6)
               .required(),
  expiration: Joi.number()
                 .integer()
                 .min(60)
                 .max(2 * 7 * 24 * 60 * 60)
                 .default(60)
                 // .default(7 * 24 * 60 * 60)
});

  const tokenExpireTime = process.env.JWT_TOKEN_EXPIRE_TIME
    ? process.env.JWT_TOKEN_EXPIRE_TIME
    : '7d';


module.exports = {
  tokenExpireTime: tokenExpireTime,
  secret: config.jwtSecret,
  userProperty: 'user',
  tokenPostInputSchema: tokenPostInputSchema,
}
