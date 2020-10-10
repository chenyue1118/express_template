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

const verify = (token) => {
  const payload = jwt.verify(token, secret);
  const { username, iat } = payload;
  if (iat && iat < Math.round(new Date() / 1000)) throw new Error('Token 已经过期');
  if (!username) throw new Error('Token is invalid');
  return payload;
}

module.exports = {
  create,
  verify
}
