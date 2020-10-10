const tokenModel = require('@cc/models/token');
const createError = require('@cc/utils/error');
const logger = require('@cc/config/logger');

/*
 * token 验证
 */
const check = (req, res, next) => {
  console.log('req.headers', req.headers.authorization);
  if (!req.headers.authorization) {
    return next(
      createError(
        '未经授权',
        '未授权用户',
        '不允许游客访问'
      )
    );
  } else {
    try {
      const authorization = req.headers.authorization;
      req.userProperty = tokenModel.verify(authorization);
      next();
    } catch (e) {
      logger.error(e.message);
      return next(
        createError(
          '令牌失效',
          '未授权用户',
          '你的token已失效'
        )
      );
    }
  }
}

module.exports = {
  check
}
