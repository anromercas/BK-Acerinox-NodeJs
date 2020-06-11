const express = require('express');
const router = express.Router();
const { getChecklistInstances, addChecklistInstance, deleteChecklistInstance, updateChecklistInstanceStatus } = require('../controllers/checklistInstance');

router
  .route('/')
  .get(getChecklistInstances)
  .post(addChecklistInstance);

router
  .route('/:id')
  .delete(deleteChecklistInstance);

router
  .route('/:newStatus/:extension')
  .put(updateChecklistInstanceStatus);

module.exports = router;