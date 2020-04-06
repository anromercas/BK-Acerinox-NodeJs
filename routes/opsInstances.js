const express = require('express');
const router = express.Router();
const { getOPSInstances, addOPSInstance, deleteOPSInstance } = require('../controllers/opsInstance');

router
  .route('/')
  .get(getOPSInstances)
  .post(addOPSInstance)

  router
  .route('/:id')
  .delete(deleteOPSInstance);

module.exports = router;