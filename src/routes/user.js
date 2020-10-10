const express = require('express');
const token = require('@cc/middlewares/token');
const userController = require('@cc/controllers/user');
const router = new express.Router()

/*
 *  Get /api/v1/user/:username
 */
router
  .route('/:username/')
  .get(token.check, userController.getUser)


module.exports = router;
