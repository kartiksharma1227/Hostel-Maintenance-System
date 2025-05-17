// File: Server/routes/complaintHistory.js
const express = require('express');
const pool = require('../db/connection'); // Ensure this exports a pool
const router = express.Router();

// Route to get complaints with filters (status, category, search)
router.get('/', async (req, res, next) => {
  try {
    const { status, category, search } = req.query;

    let sql = `SELECT * FROM Complaints WHERE 1`;

    // Apply status filter if provided
    if (status && status !== 'all') {
      sql += ` AND status = ?`;
    }

    // Apply category filter if provided
    if (category && category !== 'all') {
      sql += ` AND category = ?`;
    }

    // Apply search filter if provided (search by title or description)
    if (search) {
      sql += ` AND (title LIKE ? OR description LIKE ?)`;
    }

    const values = [];
    if (status && status !== 'all') values.push(status);
    if (category && category !== 'all') values.push(category);
    if (search) {
      const searchTerm = `%${search}%`;
      values.push(searchTerm, searchTerm);
    }

    // Execute the query
    const [complaints] = await pool.execute(sql, values);

    // Respond with the results
    res.json(complaints);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
