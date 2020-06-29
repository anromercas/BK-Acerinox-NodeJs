const express = require('express');
const router = express.Router();
const { addIncident, getIncidents, updateIncident, deleteIncident } = require('../controllers/incident');

router
  .route('/')
  .get(getIncidents)
  .post(addIncident)

router
  .route('/:id')
  .put(updateIncident)
  .delete(deleteIncident)

module.exports = router;