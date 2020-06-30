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

  // TODO: si ponemos dos parámetros entra en el endpoint de /:page/:pageSize en vez de por aquí, hay que ver como haerlo.
router
  .route('/instance/byuser/go')
  .get(getChecklistInstancesByUser)

module.exports = router;