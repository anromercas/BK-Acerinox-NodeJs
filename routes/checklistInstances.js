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
  .post(addChecklistInstance);
  
router
  .route('/:page/:pageSize')
  .get(getChecklistInstances);

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
  .get(getChecklistInstancesByUser)

module.exports = router;