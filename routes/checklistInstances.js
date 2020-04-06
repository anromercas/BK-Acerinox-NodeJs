const express = require('express');
const router = express.Router();
const { getChecklistInstances, addChecklistInstance, deleteChecklistInstance } = require('../controllers/ChecklistInstance');

router
  .route('/')
  .get(getChecklistInstances)
  .post(addChecklistInstance)

  router
  .route('/:id')
  .delete(deleteChecklistInstance);

module.exports = router;