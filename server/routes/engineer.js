const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// POST /api/engineer/login
router.post('/engineer/login', async (req, res) => {
  try {
    const { user_PK, password } = req.body;

    if (!user_PK || !password) {
      return res.status(400).json({ error: 'User ID and password are required' });
    }

    const [results] = await db.query(
      `SELECT * FROM Users WHERE user_PK = ?`,
      [user_PK]
    );

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Direct password match (no bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json({
      message: 'Engineer login successful',
      user: { ...user, user_PK: user.user_PK }
    });
  } catch (err) {
    console.error('Engineer login error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
});

module.exports = router;
