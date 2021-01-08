const express = require('express');
const token = require('@cc/middlewares/token');
const downController = require('@cc/controllers/download');
const router = express.Router();

router
  .route('/')
  .post(token.check, downController.getDown)

module.exports = router;
