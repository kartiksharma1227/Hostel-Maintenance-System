const express = require('express');
const router = express.Router();
const {assignEngineer} = require('../../controllers/adminControllers/adminAssignmentController');

router.post('/assignments', assignEngineer);

module.exports = router;
