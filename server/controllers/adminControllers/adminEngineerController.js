const db = require('../../db/connection');

const getAllEngineers = async (req, res, next) => {
  try {
    console.log('⏳  GET /api/admin/engineers called');
    const [rows] = await db.execute(`
      SELECT u.name, u.mail_UN AS email, u.role,
             e.phone_number AS phone, e.availability AS status, 
             e.specialization, e.years_of_experience, e.address, e.user_FK
      FROM Engineers e
      JOIN Users u ON e.user_FK = u.user_PK
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching engineers:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

const addEngineer = async (req, res, next) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    let { user_FK, name, mail_UN, phone_number, specialization, years_of_experience, address, password } = req.body;

    if (!name || !mail_UN || !phone_number || !specialization) {
      await conn.rollback();
      return res.status(400).json({ error: 'Name, mail_UN, phone_number, and specialization are required' });
    }

    let role = 'engineer';
    let availability = 1;

    if (!user_FK) {
      const now = new Date();
      const [userResult] = await conn.execute(
        `INSERT INTO Users (name, mail_UN, password, role, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, mail_UN, password, role, now, now]
      );
      user_FK = userResult.insertId;
    }

    if (!user_FK) {
      await conn.rollback();
      return res.status(400).json({ error: 'user_FK is required' });
    }

    availability = Number(availability) || 0;
    const expYears = Number(years_of_experience) || 0;

    const [engResult] = await conn.execute(
      `INSERT INTO Engineers
       (user_FK, phone_number, availability, specialization, years_of_experience, address)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [user_FK, phone_number, availability, specialization, expYears, address || null]
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
};

// 👇 All exports at the end
module.exports = {
  getAllEngineers,
  addEngineer
};
