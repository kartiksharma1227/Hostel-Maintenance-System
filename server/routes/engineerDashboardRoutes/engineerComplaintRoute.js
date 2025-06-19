
const express = require('express');
const {
  getAssignedComplaints,
  getCompletedComplaints,getPendingAssignmentsForEngineer
} = require('../../controllers/engineerControllers/engineerComplaintController');

const router = express.Router();

// List assigned (pending/in-progress) complaints — without JWT
router.get('/complaints/assigned/:id', getAssignedComplaints);

// List completed complaints — without JWT
router.get('/complaints/completed/:id', getCompletedComplaints);

// List pending assignments for engineer — without JWT
router.get('/complaints/pending/:id', getPendingAssignmentsForEngineer);

module.exports = router;
