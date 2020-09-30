// module dependencies
const express  = require('express');
const controller = require('@cc/controllers/index');
const authRouter = require('@cc/routes/auth');
// const tokenRouter = require('@cc/routes/token')

const router = new express.Router();

router.route('/').all(controller.index);

router.use('/auth', authRouter);

module.exports = router;
