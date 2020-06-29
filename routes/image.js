const express = require('express');
const router = express.Router();
const { getImg } = require('../controllers/image');

const { verifyToken } = require('../middlewares/auth');

router
  .route('/:type/:img')
  .get(getImg);

  

module.exports = router;