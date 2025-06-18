// File: Server/routes/authLogin.js

const express = require('express');
const router = express.Router();
// const { studentLogin,adminLogin } = require('../controllers/authController.js');
const {login}= require('../controllers/authController.js');
// POST /api/student/login
// router.post('/student/login', studentLogin);
// POST /api/admin/login
// router.post('/admin/login', adminLogin);
router.post('/login', login); // Unified login route for both students and admins

module.exports = router;
