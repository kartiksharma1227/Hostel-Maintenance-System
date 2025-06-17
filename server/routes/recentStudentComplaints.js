const express = require('express');
const pool = require('../db/connection'); // Ensure this exports a pool
const router = express.Router();

// Route to fetch latest 5 complaints for a user
router.get('/', async (req, res, next) => {
  try {
    const { roll_number } = req.query;

    if (!roll_number) {
      return res.status(400).json({ error: 'roll_number is required' });
    }

    const sql = `
      SELECT * FROM Complaints 
      WHERE submitted_by = ? 
      ORDER BY created_at DESC 
      LIMIT 5
    `;
    const [complaints] = await pool.execute(sql, [roll_number]);

    res.json(complaints);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
