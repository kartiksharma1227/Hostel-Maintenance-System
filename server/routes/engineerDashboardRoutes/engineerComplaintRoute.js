
const express = require('express');
const {
  getAssignedComplaints,
  getCompletedComplaints,getPendingAssignmentsForEngineer
,acceptComplaint,rejectComplaint} = require('../../controllers/engineerControllers/engineerComplaintController');

const router = express.Router();

// List assigned (pending/in-progress) complaints — without JWT
router.get('/complaints/assigned/:id', getAssignedComplaints);

// List completed complaints — without JWT
router.get('/complaints/completed/:id', getCompletedComplaints);

// List pending assignments for engineer — without JWT
router.get('/complaints/pending/:id', getPendingAssignmentsForEngineer);

router.post('/complaints/accept/:id', acceptComplaint);
router.post('/complaints/reject/:id', rejectComplaint);

module.exports = router;
