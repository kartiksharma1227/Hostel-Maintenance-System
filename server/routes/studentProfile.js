const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /api/student/profile/:user_pk
router.get('/profile/:user_pk', async (req, res) => {
  const { user_pk } = req.params;

  if (!user_pk) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const [results] = await db.query(
      `
      SELECT 
        u.user_PK,
        u.name,
        u.mail_UN,
        u.role,
        u.created_at,
        u.updated_at,
        s.student_PK,
        s.user_FK,
        s.room_FK,
        s.roll_number
      FROM Users u
      JOIN Student s ON u.user_PK = s.user_FK
      WHERE u.user_PK = ?
      `,
      [user_pk]
    );

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ profile: results[0] });
  } catch (error) {
    console.error("Error fetching student profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
