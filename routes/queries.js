const express = require('express');
const router = express.Router();
const { getLatest, getAuditors, getChecklistsByCategory, getChecklistsByPeriod, getAggregationTable } = require('../controllers/query');

router
  .route('/latests/:quantity')
  .get(getLatest);

router
  .route('/auditors')
  .get(getAuditors);

router
  .route('/statistics/checklistsByCategory')
  .get(getChecklistsByCategory);

router
  .route('/statistics/checklistsByPeriod/:type/:period')
  .get(getChecklistsByPeriod);

router
  .route('/statistics/aggregationTableData/:type')
  .get(getAggregationTable);

module.exports = router;