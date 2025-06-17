// File: Server/routes/complaintHistory.js
const express = require('express');
const pool = require('../db/connection'); // Ensure this exports a pool
const router = express.Router();

// Route to get complaints with filters (status, category, search)
router.get('/', async (req, res, next) => {
  try {
    const { status, category, search,roll_number } = req.query;
    console.log("Query Parameters:", req.query);

    // let sql = `SELECT * FROM Complaints WHERE roll_number = ?`;
    // // const values = [roll_number]; // Start with roll_number filter

    // // Apply status filter if provided
    // if (status && status !== 'all') {
    //   sql += ` AND status = ?`;
    // }

    // // Apply category filter if provided
    // if (category && category !== 'all') {
    //   sql += ` AND category = ?`;
    // }

    // // Apply search filter if provided (search by title or description)
    // if (search) {
    //   sql += ` AND (title LIKE ? OR description LIKE ?)`;
    // }

    // const values = [roll_number];
    // if (status && status !== 'all') values.push(status);
    // if (category && category !== 'all') values.push(category);
    // if (search) {
    //   const searchTerm = `%${search}%`;
    //   values.push(searchTerm, searchTerm);
    // }

    // // Execute the query
    // const [complaints] = await pool.execute(sql, values);

    // // Respond with the results
    // res.json(complaints);

    if (!roll_number) {
      return res.status(400).json({ error: "Missing roll_number" });
    }

    let sql = `SELECT * FROM Complaints WHERE submitted_by = ?`;
    const values = [roll_number];

    if (status && status !== 'all') {
      sql += ` AND status = ?`;
      values.push(status);
    }

    if (category && category !== 'all') {
      sql += ` AND category = ?`;
      values.push(category);
    }

    if (search) {
      sql += ` AND (title LIKE ? OR description LIKE ?)`;
      const searchTerm = `%${search}%`;
      values.push(searchTerm, searchTerm);
    }

    console.log("Final SQL:", sql);
    console.log("Values:", values);

    const [complaints] = await pool.execute(sql, values);
    res.json(complaints);











  } catch (err) {
    console.log('ERROR in /complaint-history:', err);
    next(err);
  }
});

module.exports = router;
