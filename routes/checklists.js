const express = require('express');
const router = express.Router();
const { getChecklists, addChecklist, deleteChecklist } = require('../controllers/checklists');

router
  .route('/')
  .get(getChecklists)
  .post(addChecklist)

  router
  .route('/:id')
  .delete(deleteChecklist);

module.exports = router;