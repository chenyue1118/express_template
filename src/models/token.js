const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const { secret, tokenExpireTime } = require('@cc/config');


const sign = (username, application, expiration) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        username,
        application,
      },
      secret,
      expiration != null ? { expiresIn: expiration } : {},
      (signError, token) => {
        signError ? reject(signError) : resolve(token);
      },
    );
  });
};


const create = async (username, application = false, expiration = tokenExpireTime) => {

  const token = await sign(username, application, expiration);
  return token
}

module.exports = {
  create
}
