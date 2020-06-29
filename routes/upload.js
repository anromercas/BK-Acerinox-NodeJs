const express = require('express');

const router = express.Router();
const { uploadImg } = require('../controllers/upload');


router
  .route('/:type/:id/:contentSection/:checkpointName/:indexObservation')
  .put(uploadImg);

router  
  .route('/:type/:id')
  .put(uploadImg);

module.exports = router;