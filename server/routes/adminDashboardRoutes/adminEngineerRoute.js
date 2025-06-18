const express = require('express');
const router = express.Router();
const {getAllEngineers,addEngineer} = require('../../controllers/adminControllers/adminEngineerController');

router.get('/engineers', getAllEngineers);
router.post('/engineer', addEngineer);

module.exports = router;
