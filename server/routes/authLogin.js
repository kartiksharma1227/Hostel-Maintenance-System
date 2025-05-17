// File: Server/routes/authLogin.js

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// POST /api/student/login
router.post('/student/login', async (req, res) => {
  try {
    const { rollno, password } = req.body;

    if (!rollno || !password) {
      return res.status(400).json({ error: 'Roll number and password are required' });
    }

    const [results] = await db.query(
      `
      SELECT u.* 
      FROM Student s
      JOIN Users u ON s.user_FK = u.user_PK
      WHERE s.roll_number = ?
      `,
      [rollno]
    );
    // console.log("Results:", results);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Plain-text password comparison
    const user = results[0];
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Send the user's data, including primary key (user_PK)
    res.json({
      message: 'Login successful',
      user: { ...user, user_PK: user.user_PK },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

module.exports = router;
