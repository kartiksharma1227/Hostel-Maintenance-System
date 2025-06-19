// routes/engineer/profile.js
const express = require('express');
const router  = express.Router();
const db      = require('../db/connection');

// GET /api/engineer/profile/:user_pk
router.get('/profile/:user_pk', async (req, res) => {
  const { user_pk } = req.params;
  console.log(`⏳  GET /api/engineer/profile/${user_pk} called`);
  if (!user_pk) {
    return res.status(400).json({ error: "Engineer ID is required" });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT
        u.user_PK               AS userPk,
        u.name                  AS name,
        u.mail_UN               AS email,
        u.role                  AS role,

          
        e.user_FK               AS userFk,

        e.phone_number          AS contactNumber,       -- phone_number → contactNumber
        e.availability          AS availability,        -- if you want to show this
        e.specialization        AS specialization,
        e.years_of_experience   AS experience,          -- years_of_experience → experience
        e.address               AS address
      FROM Users u
      JOIN Engineers e ON u.user_PK = e.user_FK
      WHERE u.user_PK = ?
      `,
      [user_pk]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Engineer not found" });
    }

    // Send back exactly: { profile: { userPk, name, email, role, employeeId, userFk,
    //                                   contactNumber, availability, specialization, experience, address } }
    res.json({ profile: rows[0] });
  } catch (err) {
    console.error("Error fetching engineer profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
