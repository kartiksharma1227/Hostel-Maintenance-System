// File: Server/routes/feedback.js

const express = require('express');
const pool = require('../db/connection');    // your MySQL pool
const router = express.Router();

// POST /api/feedback
// body: { complaint_FK: int, rating: int, text: string }
router.post('/', async (req, res, next) => {
  try {
    const { complaint_FK, rating, text } = req.body;

    if (complaint_FK == null || rating == null || text == null) {
      return res.status(400).json({ error: 'complaint_FK, rating and text are required' });
    }

    const sql = `
      INSERT INTO Feedback
        (complaint_FK, rating, text, created_at)
      VALUES (?, ?, ?, NOW())
    `;
    const [result] = await pool.execute(sql, [complaint_FK, rating, text]);

    res.status(201).json({
      message: 'Feedback created',
      feedbackId: result.insertId
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
