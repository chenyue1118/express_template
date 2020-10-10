const createError = require('@cc/utils/error');

const getUser = (req, res, next) => {
  try {
    const username = req.params.username;
    // TODO: 获取用户信息 （ models 层）
    // const userInfo = await userModel.getUser(username);
    console.log('req.userProperty', req.userProperty);
    return res.status(200).json({
      username,
      textInfo: 'test'
    });
  } catch (error) {
    if (error.status === 404) {
      return next(
        createError(
          'Bad Request',
          'NoUserError',
          `User ${req.params.username} is not found.`,
        ),
      );
    }
    return next(createError.unknown(error));
  }
}

module.exports = {
  getUser
}
