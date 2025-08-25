const express = require('express');
const router = express.Router();
const {
  getAllEngineers,
  addEngineer,
  getEngineerById,deactivateEngineer,getFilteredEngineers
} = require('../../controllers/adminControllers/adminEngineerController');

// Routes
router.get('/engineers', getAllEngineers);            // Get all engineers
router.post('/engineer', addEngineer);                // Add a new engineer
router.get('/engineers/:id', getEngineerById);        // Get engineer by ID (for detailed view)
router.patch('/engineers/:user_FK/deactivate', deactivateEngineer); // Deactivate an engineer
// router.get("/engineers", getFilteredEngineers);

module.exports = router;
