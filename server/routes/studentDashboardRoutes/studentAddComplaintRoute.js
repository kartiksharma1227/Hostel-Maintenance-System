const express = require('express');
const router = express.Router();
const { createStudentComplaint } = require('../../controllers/studentControllers/studentAddComplaintController');

// POST /api/complaints
router.post('/', createStudentComplaint);

module.exports = router;
