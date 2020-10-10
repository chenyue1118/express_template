const createError = require('@cc/utils/error');
const tokenModel = require('@cc/models/token');

/*
 * get the Token
 */
 const get = async (req, res, next) => {
   const username = req.body.username
   const password = req.body.password
   try {
     // TODO: 用户名和密码验证
     const token = await tokenModel.create(username);
     return res.status(200).json({
      user: username,
      token: token
    });
   } catch (err) {
     next(createError(
       'Forbidden',
       '用户名或者密码错误',
       err
     ))
   }
 }

 module.exports = {
   get
 }
