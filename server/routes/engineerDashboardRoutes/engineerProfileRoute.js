// routes/engineer/profile.js
const express = require('express');
const router = express.Router();
const { getEngineerProfile } = require('../../controllers/engineerControllers/engineerProfileController');


router.get('/profile/:user_pk', getEngineerProfile);

module.exports = router;