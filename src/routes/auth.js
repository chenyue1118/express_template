const express = require('express');
const parameter = require('@cc/middlewares/parameter');
const tokenConfig = require('@cc/config/token');

const router = new express.Router()

/*
 *  GET /api/v1/auth
 */
router
  .route('/login')
  .post(parameter.validate(tokenConfig.tokenPostInputSchema))


module.exports = router;
