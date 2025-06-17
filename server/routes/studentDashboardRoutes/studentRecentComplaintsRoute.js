const express = require("express");
const router = express.Router();


const { getRecentStudentComplaints } = require("../../controllers/studentControllers/studentRecentComplaintsController");

// GET /api/student/recent-complaints
router.get("/", getRecentStudentComplaints);

module.exports = router;