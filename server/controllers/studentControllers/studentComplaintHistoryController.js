// const pool = require("../../db/connection");


// const getStudentComplaintHistory = async (req, res, next) => {
//   try {
//     const { status, category, search, roll_number } = req.query;
//     console.log("Query Parameters:", req.query);

//     if (!roll_number) {
//       return res.status(400).json({ error: "Missing roll_number" });
//     }

//     let sql = `SELECT * FROM Complaints WHERE submitted_by = ?`;
//     const values = [roll_number];

//     if (status && status !== 'all') {
//       sql += ` AND status = ?`;
//       values.push(status);
//     }

//     if (category && category !== 'all') {
//       sql += ` AND category = ?`;
//       values.push(category);
//     }

//     if (search) {
//       sql += ` AND (title LIKE ? OR description LIKE ?)`;
//       const searchTerm = `%${search}%`;
//       values.push(searchTerm, searchTerm);
//     }

//     sql += ` ORDER BY created_at DESC`; // Optional: maintain order

//     console.log("Final SQL:", sql);
//     console.log("Values:", values);

//     const [complaints] = await pool.execute(sql, values);
//     res.json(complaints);
//   } catch (err) {
//     console.error("ERROR in getComplaintHistory:", err);
//     next(err);
//   }
// };

// module.exports = { getStudentComplaintHistory };
const pool = require("../../db/connection");

const getStudentComplaintHistory = async (req, res, next) => {
  try {
    const { status, category, search, roll_number } = req.query;
    console.log("Query Parameters:", req.query);

    if (!roll_number) {
      return res.status(400).json({ error: "Missing roll_number" });
    }

    let sql = `
      SELECT 
        c.*, 
        f.rating, 
        f.text AS feedback 
      FROM Complaints c
      LEFT JOIN Feedback f ON c.id = f.complaint_FK
      WHERE c.submitted_by = ?
    `;
    const values = [roll_number];

    if (status && status !== 'all') {
      sql += ` AND c.status = ?`;
      values.push(status);
    }

    if (category && category !== 'all') {
      sql += ` AND c.category = ?`;
      values.push(category);
    }

    if (search) {
      sql += ` AND (c.title LIKE ? OR c.description LIKE ?)`;
      const searchTerm = `%${search}%`;
      values.push(searchTerm, searchTerm);
    }

    sql += ` ORDER BY c.created_at DESC`;

    console.log("Final SQL:", sql);
    console.log("Values:", values);

    const [complaints] = await pool.execute(sql, values);
    console.log("Fetched Complaints:", complaints);
    res.json(complaints);
  } catch (err) {
    console.error("ERROR in getComplaintHistory:", err);
    next(err);
  }
};

module.exports = { getStudentComplaintHistory };
