const express = require('express');
const router = express.Router();
const {getFilteredComplaints,getComplaintDetails,getRecentComplaints,getComplaintStats} = require('../../controllers/adminControllers/adminComplaintController');
router.get("/complaints/recent", getRecentComplaints);

router.get('/complaints', getFilteredComplaints);
router.get('/complaints/with-assignees/:id', getComplaintDetails);
router.get("/complaints/stats", getComplaintStats);


module.exports = router;
