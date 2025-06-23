// routes/engineerDashboard/scheduledVisitsRoute.js
const express = require('express');
const router = express.Router();

const { getScheduledVisits } = require('../../controllers/engineerControllers/engineerScheduledVisitsController');

router.get('/scheduled-visits/:engineerId', getScheduledVisits);

module.exports = router;
