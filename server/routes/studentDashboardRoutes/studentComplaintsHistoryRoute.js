const express = require("express");
const router = express.Router();


const { getStudentComplaintHistory } = require("../../controllers/studentControllers/studentComplaintHistoryController");

// GET /api/complaint-history
router.get('/', getStudentComplaintHistory);   

module.exports = router;