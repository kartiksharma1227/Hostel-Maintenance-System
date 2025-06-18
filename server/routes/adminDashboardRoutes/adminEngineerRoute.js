// const express = require('express');
// const router = express.Router();
// const {getAllEngineers,addEngineer} = require('../../controllers/adminControllers/adminEngineerController');

// router.get('/engineers', getAllEngineers);
// router.post('/engineer', addEngineer);

// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAllEngineers,
  addEngineer,
  getEngineerById,deactivateEngineer // ✅ Import the new controller function
} = require('../../controllers/adminControllers/adminEngineerController');

// 📌 Routes
router.get('/engineers', getAllEngineers);            // Get all engineers
router.post('/engineer', addEngineer);                // Add a new engineer
router.get('/engineers/:id', getEngineerById);        // ✅ Get engineer by ID (for detailed view)
router.patch('/engineers/:user_FK/deactivate', deactivateEngineer); // ✅ Deactivate an engineer

module.exports = router;
