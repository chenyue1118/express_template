const createError = require('@cc/utils/error');
const tokenModel = require('@cc/models/token');

/*
 * get the Token
 */
 const get = (req, res, next) => {
   const username = req.body.username
   const password = req.body.password
   try {
     // TODO: 用户名和密码验证
     const token = tokenModel.create(username);
     res.send({
       username,
       password,
       token
     })
   } catch (err) {
     next(createError(
       'Forbidden',
       '用户名或者密码错误',
       err
     ))
   }
 }
