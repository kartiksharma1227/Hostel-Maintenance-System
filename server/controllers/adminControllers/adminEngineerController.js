const db = require('../../db/connection');
const mailSender = require("../../utils/mailSender");
const getAllEngineers = async (req, res, next) => {
  try {
    console.log('⏳  GET /api/admin/engineers called');
    const [rows] = await db.execute(`
      SELECT u.name, u.mail_UN AS email, u.role,
             e.phone_number AS phone, e.availability AS status, 
             e.specialization, e.years_of_experience, e.address, e.user_FK
      FROM Engineers e
      JOIN Users u ON e.user_FK = u.user_PK
      where e.isWorking = 1
    `);
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching engineers:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

// const addEngineer = async (req, res, next) => {
//   const conn = await db.getConnection();
//   try {
//     await conn.beginTransaction();

//     let { user_FK, name, mail_UN, phone_number, specialization, years_of_experience, address, password } = req.body;

//     if (!name || !mail_UN || !phone_number || !specialization) {
//       await conn.rollback();
//       return res.status(400).json({ error: 'Name, mail_UN, phone_number, and specialization are required' });
//     }

//     let role = 'engineer';
//     let availability = 1;

//     if (!user_FK) {
//       const now = new Date();
//       const [userResult] = await conn.execute(
//         `INSERT INTO Users (name, mail_UN, password, role, created_at, updated_at)
//          VALUES (?, ?, ?, ?, ?, ?)`,
//         [name, mail_UN, password, role, now, now]
//       );
//       user_FK = userResult.insertId;
//     }

//     if (!user_FK) {
//       await conn.rollback();
//       return res.status(400).json({ error: 'user_FK is required' });
//     }

//     availability = Number(availability) || 0;
//     const expYears = Number(years_of_experience) || 0;

//     const [engResult] = await conn.execute(
//       `INSERT INTO Engineers
//        (user_FK, phone_number, availability, specialization, years_of_experience, address)
//        VALUES (?, ?, ?, ?, ?, ?)`,
//       [user_FK, phone_number, availability, specialization, expYears, address || null]
//     );

//     await conn.commit();
//     const user_email = userResult[0].mail_UN;
//     await mailSender(
//       user_email,
//       "Complaint Registered ✔️",
//       `<div style="font-family:Arial,sans-serif;font-size:14px;">
//          <h3 style="color:#333;">Hi ${submitted_by},</h3>
//          <p>Your complaint titled <strong>${title}</strong> has been successfully registered in the Hostel Maintenance System.</p>
//          <p><strong>Status:</strong> Pending</p>
//          <p>Our team will address it shortly.</p>
//          <br/>
//          <p style="color:gray;">Regards,<br/>Hostel Maintenance System</p>
//        </div>`
//     );
//     res.status(201).json({
//       message: 'Engineer (and user if created) added',
//       engineerId: engResult.insertId,
//       user_FK
//     });

//   } catch (err) {
//     await conn.rollback();
//     console.error('❌  Error in POST /api/admin/engineer:', err);
//     next(err);
//   } finally {
//     conn.release();
//   }
// };
const addEngineer = async (req, res, next) => {
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    let {
      user_FK,
      name,
      mail_UN,
      phone_number,
      specialization,
      years_of_experience,
      address,
      password
    } = req.body;

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

    // ✅ Send welcome email
    await mailSender(
      mail_UN,
      "Welcome to Hostel Maintenance System",
      `<div style="font-family:Arial,sans-serif;font-size:14px;">
         <h3 style="color:#333;">Hi ${name},</h3>
         <p>Your engineer account has been successfully created.</p>
         <p><strong>Username:</strong> ${user_FK}</p>
         <p><strong>Password:</strong> ${password}</p>
         <p>You can now login to the Hostel Maintenance System to handle maintenance complaints.</p>
         <br/>
         <p style="color:gray;">Regards,<br/>Hostel Maintenance System</p>
       </div>`
    );

    res.status(201).json({
      message: 'Engineer (and user if created) added',
      engineerId: engResult.insertId,
      user_FK
    });

  } catch (err) {
    await conn.rollback();
    console.error('❌ Error in POST /api/admin/engineer:', err);
    next(err);
  } finally {
    conn.release();
  }
};


const getEngineerById = async (req, res, next) => {
  const { id } = req.params;
  console.log(`🔍 Fetching engineer with ID: ${id}`);
  try {
    console.log(`🔍 GET /api/admin/engineers/${id} called`);
    const [rows] = await db.execute(
      `SELECT u.user_PK AS userFk, u.name AS fullName, u.mail_UN AS email,
              e.phone_number AS phoneNumber, e.availability AS isAvailable,
              e.specialization, e.years_of_experience AS yearsOfExperience,
              e.address
       FROM Engineers e
       JOIN Users u ON e.user_FK = u.user_PK
       WHERE e.user_FK = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Engineer not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(`❌ Error in GET /api/admin/engineers/${id}:`, err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};
const deactivateEngineer = async (req, res) => {
  const { user_FK } = req.params;
  console.log(`🔒 Deactivating engineer with user_FK: ${user_FK}`);
  try {
    const [result] = await db.query(
      `UPDATE Engineers SET isWorking = 0 WHERE user_FK = ?`,
      [user_FK]
    );
    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Engineer not found" });
    }

    res.json({ message: "Engineer successfully deactivated" });
  } catch (err) {
    console.error("Deactivate engineer error:", err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};

// 👇 All exports at the end
module.exports = {
  getAllEngineers,
  addEngineer,getEngineerById,deactivateEngineer,
};
