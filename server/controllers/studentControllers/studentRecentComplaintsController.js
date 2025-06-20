// const pool = require("../../db/connection");

// const getRecentStudentComplaints = async (req, res, next) => {
//   try {
//     const { roll_number } = req.query;

//     if (!roll_number) {
//       return res.status(400).json({ error: "roll_number is required" });
//     }

//     const sql = `
//       SELECT * FROM Complaints 
//       WHERE submitted_by = ? 
//       ORDER BY created_at DESC 
//       LIMIT 5
//     `;

//     const [complaints] = await pool.execute(sql, [roll_number]);

//     res.json(complaints);
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = { getRecentStudentComplaints };


const pool = require("../../db/connection");

const getRecentStudentComplaints = async (req, res, next) => {
  try {
    const { roll_number } = req.query;

    if (!roll_number) {
      return res.status(400).json({ error: "roll_number is required" });
    }

    const sql = `
      SELECT 
        c.*,
        f.rating,
        f.text AS feedback
      FROM Complaints c
      LEFT JOIN Feedback f ON c.id = f.complaint_FK
      WHERE c.submitted_by = ?
      ORDER BY c.created_at DESC 
      LIMIT 5
    `;

    const [complaints] = await pool.execute(sql, [roll_number]);

    res.json(complaints);
  } catch (err) {
    console.error("Error in getRecentStudentComplaints:", err);
    next(err);
  }
};

module.exports = { getRecentStudentComplaints };
