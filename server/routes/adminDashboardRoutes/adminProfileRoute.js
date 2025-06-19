const express = require("express");
const router = express.Router();
const { getAdminProfile } = require("../../controllers/adminControllers/adminProfileController");

// GET /api/admin/profile/:userPK
router.get("/profile/:userPK", getAdminProfile);

module.exports = router;
