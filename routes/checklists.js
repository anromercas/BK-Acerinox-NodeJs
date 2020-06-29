const express = require('express');
const router = express.Router();
const { getChecklists, addChecklist, deleteChecklist, updateChecklist } = require('../controllers/checklists');

router
  .route('/')
  .get(getChecklists)
  .post(addChecklist);

router
  .route('/:id')
  .delete(deleteChecklist)
  .put(updateChecklist)

module.exports = router;