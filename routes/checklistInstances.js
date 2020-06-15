const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/auth');

const { 
  getChecklistInstances,
  getChecklistInstanceById,
  addChecklistInstance, 
  deleteChecklistInstance, 
  updateChecklistInstanceStatus, 
  updateChecklistInstance,
  getChecklistInstancesByUser } = require('../controllers/checklistInstance');

router
  .route('/')
  .get(getChecklistInstances)
  .post(addChecklistInstance);

router
  .route('/:id')
  .get(getChecklistInstanceById)
  .delete(deleteChecklistInstance)
  .put(updateChecklistInstance)

router
  .route('/:newStatus/:extension')
  .put(updateChecklistInstanceStatus)

router
  .route('/instance/byuser')
  .get(verifyToken, getChecklistInstancesByUser)

module.exports = router;