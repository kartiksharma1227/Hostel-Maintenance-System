// File: Server/routes/authLogin.js

const express = require('express');
const router = express.Router();
const { studentLogin } = require('../controllers/authController.js');

// POST /api/student/login
router.post('/student/login', studentLogin);

module.exports = router;
