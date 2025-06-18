const express = require('express');
const db = require('../db/connection');
const router = express.Router();


// GET /api/admin/engineers - fetch all engineers with user info
// GET /api/admin/engineers
router.get('/engineers', async (req, res, next) => {
    try {
      console.log('⏳  GET /api/admin/engineers called');
        const [rows] = await db.execute(`
          SELECT   u.name,
                   u.mail_UN AS email,
                   u.role,
                   e.phone_number AS phone,
                   e.availability AS status,
                   e.specialization,
                   e.years_of_experience,
                   e.address,
                   e.user_FK
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

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    let {
      user_FK,
      name,
      mail_UN,
      // role,
      phone_number,
      // availability,
      specialization,
      years_of_experience,
      address,
      password,
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
      role = 'engineer';
      availability = 1; // Default availability to 1 (available)

      const now = new Date();
      const [userResult] = await conn.execute(
        `INSERT INTO Users (name, mail_UN, password, role, created_at, updated_at)
         VALUES (?, ?,?, ?, ?, ?)`,
        [name, mail_UN, password,role, now, now]
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




router.get('/complaints', async (req, res, next) => {
  try {
    console.log('⏳  GET /api/admin/complaints called');
    const [rows] = await db.execute(`
      SELECT *
      FROM Complaints c
      ORDER BY c.created_at DESC
    `);
    
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching complaints:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});




// // GET /api/admin/complaints/with-assignees
// router.get('/complaints/with-assignees', async (req, res) => {
//   try {
//     console.log('🔍  GET /api/admin/complaints/with-assignees called');
    
//     const [rows] = await db.execute(`
//       SELECT 
//         c.*,
//         a.assigned_date,
//         u.name as engineer_name,
//         u.phone as engineer_phone
//       FROM Complaints c
//       JOIN Assignments a ON c.id = a.complaint_FK
//       JOIN Users u ON a.engineer_FK = u.user_PK
//       ORDER BY c.created_at DESC
//     `);
    
//     res.json(rows);
//   } catch (err) {
//     console.error("❌ Error fetching assigned complaints:", err);
//     res.status(500).json({ error: "Internal Server Error", details: err.message });
//   }
// });





// POST /api/assignments
router.post("/assignments", async (req, res) => {
  const { complaintId, engineerId, note } = req.body;
  console.log('⏳  POST /api/admin/assignments body:', req.body);


  if (!complaintId || !engineerId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO assignments (complaint_FK, engineer_FK) VALUES (?, ?)`,
      [complaintId, engineerId]
    );

    // Optionally update complaint status to "In Progress"
    await db.execute(`UPDATE complaints SET status = ? WHERE id = ?`, [
      "In Progress",
      complaintId,
    ]);

    res.status(201).json({ message: "Engineer assigned successfully" });
  } catch (error) {
    console.error("Assignment Error:", error);
    res.status(500).json({ message: "Failed to assign engineer" });
  }
});


// GET /admin/complaints/with-assignees/:id
router.get('/complaints/with-assignees/:id', async (req, res) => {
  try {
    const complaintId = req.params.id;
    // const [rows] = await db.execute(`
    //   SELECT c.*, a.assigned_date, u.name, u.phone_number
    //   FROM Complaints c
    //   LEFT JOIN Assignments a ON c.id = a.complaint_FK
    //   LEFT JOIN Users u ON a.engineer_FK = u.user_PK
    //   WHERE c.id = ?
    // `, [complaintId]);
    const [rows] = await db.execute(`
      SELECT 
        c.*, 
        s.roll_number AS student_roll_number,
        s.room_FK AS student_room_number,

        u_e.name AS engineer_name,
        e.phone_number AS engineer_phone,

        u_a.name AS admin_name,
        a.phone_number AS admin_phone,

        f.rating AS feedback_rating,
        f.text AS feedback_text,
        f.created_at AS feedback_created_at,

        assign.assigned_date AS assigned_date

      FROM Complaints c

      LEFT JOIN Students s ON c.submitted_by = s.roll_number
      LEFT JOIN Assignments assign ON assign.complaint_FK = c.id
      LEFT JOIN Engineers e ON assign.engineer_FK = e.user_FK
      LEFT JOIN Users u_e ON e.user_FK = u_e.user_PK
      LEFT JOIN Admin a ON assign.admin_FK = a.user_FK
      LEFT JOIN Users u_a ON a.user_FK = u_a.user_PK
      LEFT JOIN Feedback f ON f.complaint_FK = c.id

      WHERE c.id = ?
`, [complaintId]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error fetching complaint details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = router;
