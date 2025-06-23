
const express = require('express');
const {
  getAssignedComplaints,
  getCompletedComplaints,getPendingAssignmentsForEngineer
,acceptComplaint,rejectComplaint,updateComplaintByEngineer} = require('../../controllers/engineerControllers/engineerComplaintController');

const router = express.Router();

// List assigned (pending/in-progress) complaints 
router.get('/complaints/assigned/:id', getAssignedComplaints);

// List completed complaints 
router.get('/complaints/completed/:id', getCompletedComplaints);

// List pending assignments for engineer 
router.get('/complaints/pending/:id', getPendingAssignmentsForEngineer);

router.put('/complaints/accept/', acceptComplaint);
router.put('/complaints/reject/', rejectComplaint);
router.put('/complaints/update/:id', updateComplaintByEngineer);
module.exports = router;
