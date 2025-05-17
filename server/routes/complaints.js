// File: Server/routes/complaints.js
const express = require('express');
const pool = require('../db/connection'); // Ensure this exports a pool
const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const {
      room_FK, title, category,
      priority, location, description,
      submitted_by
    } = req.body;

    const sql = `
      INSERT INTO Complaints
        (room_FK, title, category, priority,
         location, description, status,
         created_at, updated_at, submitted_by)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW(), ?)
    `;
    const [result] = await pool.execute(sql, [
      room_FK, title, category,
      priority, location, description,
      submitted_by
    ]);
    res.status(201).json({ complaintId: result.insertId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
