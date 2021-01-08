const createError = require('@cc/utils/error');
const fs = require('fs');
const path = require('path');


// 下载文件
const getDown = (req, res, next) => {
  try {
    // 请求下载文件
    fs.createReadStream(path.join(__dirname, './../../public/thumb_Mon_Jan_14_2019.jpg')).pipe(res)
  } catch (error) {
    if (error.status === 404) {
      return next(
        createError(
          'Bad Request',
          'NotFound',
          `Url is not found.`,
        ),
      );
    }
    return next(createError.unknown(error));
  }
}

module.exports = {
  getDown
}
