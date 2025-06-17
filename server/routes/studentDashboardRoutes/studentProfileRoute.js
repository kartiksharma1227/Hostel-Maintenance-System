const express = require("express");
const router = express.Router();
const { getStudentProfile } = require("../../controllers/studentControllers/studentProfileController");
// const { router } = require("../studentDashboardRoutes");

// GET /api/student/profile/:user_pk
router.get("/profile/:user_pk", getStudentProfile);



module.exports = router;
