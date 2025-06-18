const express = require('express');
const router = express.Router();
const {getAllComplaints,getComplaintDetails} = require('../../controllers/adminControllers/adminComplaintController');

router.get('/complaints', getAllComplaints);
router.get('/complaints/with-assignees/:id', getComplaintDetails);


module.exports = router;
