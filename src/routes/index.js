// module dependencies
const express  = require('express');
const controller = require('@cc/controllers/index');
const authRouter = require('@cc/routes/auth');
const userRouter = require('@cc/routes/user');
// const tokenRouter = require('@cc/routes/token')

const router = new express.Router();

router.route('/').all(controller.index);

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
