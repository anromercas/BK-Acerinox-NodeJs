const express = require('express');

const router = express.Router();
const { uploadImg } = require('../controllers/upload');

const { verifyToken } = require('../middlewares/auth');


router
  .route('/:type/:id/:contentName/:indexFreeValue')
  .put(uploadImg);

  

module.exports = router;