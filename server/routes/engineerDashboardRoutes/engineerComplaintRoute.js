
const express = require('express');
const {
  getAssignedComplaints,
  getCompletedComplaints
} = require('../../controllers/engineerControllers/engineerComplaintController');

const router = express.Router();

// List assigned (pending/in-progress) complaints — without JWT
router.get('/complaints/assigned/:id', getAssignedComplaints);

// List completed complaints — without JWT
router.get('/complaints/completed/:id', getCompletedComplaints);

module.exports = router;
