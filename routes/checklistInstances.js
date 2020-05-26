const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');

const { 
  getChecklistInstances, 
  addChecklistInstance, 
  deleteChecklistInstance, 
  updateChecklistInstanceStatus, 
  getChecklistInstancesByUser } = require('../controllers/checklistInstance');

router
  .route('/')
  .get(getChecklistInstances)
  .post(addChecklistInstance);

router
  .route('/:id')
  .delete(deleteChecklistInstance)

router
  .route('/:newStatus/:extension')
  .put(updateChecklistInstanceStatus)

router
  .route('/checklistInstancesByUser')
  .get(verifyToken, getChecklistInstancesByUser)

module.exports = router;