const express = require('express');
const pool = require('../db/connection');
const router = express.Router();


// GET /api/admin/engineers - fetch all engineers with user info
// GET /api/admin/engineers
router.get('/engineers', async (req, res, next) => {
    try {
        const [rows] = await pool.execute(`
            SELECT e.engineer_PK AS id,
                   u.name,
                   u.mail_UN AS email,
                   u.role,
                   e.phone_number AS phone,
                   e.availability AS status,
                   e.specialization,
                   e.years_of_experience,
                   e.address
            FROM Engineers e
            JOIN Users u ON e.user_FK = u.user_PK
          `);
          
          
          
      res.json(rows);
    } catch (err) {
      console.error("❌ Error fetching engineers:", err);  // Log the actual error
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  });
  
  
// POST /api/admin/engineer
router.post('/engineer', async (req, res, next) => {
  console.log('⏳  POST /api/admin/engineer body:', req.body);

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    let {
      user_FK,
      name,
      mail_UN,
      role,
      phone_number,
      availability,
      specialization,
      years_of_experience,
      address
    } = req.body;

    // Basic required-field validation
    if (!name || !mail_UN || !phone_number || !specialization) {
      await conn.rollback();
      return res.status(400).json({
        error: 'Name, mail_UN, phone_number, and specialization are required'
      });
    }

    // Create new user if needed
    if (!user_FK) {
      role = role || 'engineer';
      const now = new Date();
      const [userResult] = await conn.execute(
        `INSERT INTO Users (name, mail_UN, role, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?)`,
        [name, mail_UN, role, now, now]
      );
      user_FK = userResult.insertId;
    }

    if (!user_FK) {
      await conn.rollback();
      return res.status(400).json({ error: 'user_FK is required' });
    }

    // Ensure numeric types
    availability = Number(availability) || 0;
    years_of_experience = Number(years_of_experience) || 0;

    // Insert engineer record
    const [engResult] = await conn.execute(
      `INSERT INTO Engineers
         (user_FK, phone_number, availability, specialization, years_of_experience, address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        user_FK,
        phone_number,
        availability,
        specialization,
        years_of_experience,
        address || null
      ]
    );

    await conn.commit();
    res.status(201).json({
      message: 'Engineer (and user if created) added',
      engineerId: engResult.insertId,
      user_FK
    });

  } catch (err) {
    await conn.rollback();
    console.error('❌  Error in POST /api/admin/engineer:', err);
    next(err);
  } finally {
    conn.release();
  }
});

module.exports = router;
