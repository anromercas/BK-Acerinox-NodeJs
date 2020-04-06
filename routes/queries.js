const express = require('express');
const router = express.Router();
const { getLatest, getAuditors } = require('../controllers/query');

router
  .route('/latests/:quantity')
  .get(getLatest);

router
  .route('/auditors')
  .get(getAuditors);
  
module.exports = router;