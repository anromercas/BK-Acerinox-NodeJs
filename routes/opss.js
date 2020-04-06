const express = require('express');
const router = express.Router();
const { getOpss, addOPS } = require('../controllers/opss');

router
  .route('/')
  .get(getOpss)
  .post(addOPS)

module.exports = router;