// routes/engineerDashboard/scheduledVisitsRoute.js
const express = require('express');
const router = express.Router();
// const { getScheduledVisits } = require('../../controllers/engineerControllers/engineerScheduledVisitsController');
const { getScheduledVisits } = require('../../controllers/engineerControllers/engineerScheduledVisitsController');
// Route: GET /api/engineer-dashboard/scheduled-visits/:engineerId
router.get('/scheduled-visits/:engineerId', getScheduledVisits);

module.exports = router;
