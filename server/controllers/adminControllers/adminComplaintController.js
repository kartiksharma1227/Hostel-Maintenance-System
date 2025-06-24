const db = require('../../db/connection');


const getAllComplaints = async (req, res, next) => {
  try {


    
    const [rows] = await db.execute(`
  WITH latest_assignments AS (
    SELECT a.*
    FROM Assignments a
    JOIN (
      SELECT complaint_FK, MAX(assigned_date) AS max_date
      FROM Assignments
      GROUP BY complaint_FK
    ) latest 
    ON a.complaint_FK = latest.complaint_FK AND a.assigned_date = latest.max_date
  )

  SELECT 
    c.*, 
    la.status AS assignmentStatus,
    la.engineer_FK,
    la.assigned_date,
    la.admin_FK
  FROM Complaints c
  LEFT JOIN latest_assignments la ON c.id = la.complaint_FK
  ORDER BY c.created_at DESC
`);


    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching complaints:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};


// const getComplaintDetails = async (req, res) => {
//   try {
//     const complaintId = req.params.id;
//     const [rows] = await db.execute(`
//       SELECT 
//         c.*, 
//         s.roll_number AS student_roll_number,
//         s.room_FK AS student_room_number,
//         u_e.name AS engineer_name,
//         e.phone_number AS engineer_phone,
//         u_a.name AS admin_name,
//         a.phone_number AS admin_phone,
//         f.rating AS feedback_rating,
//         f.text AS feedback_text,
//         f.created_at AS feedback_created_at,
//         assign.assigned_date AS assigned_date
//       FROM Complaints c
//       LEFT JOIN Students s ON c.submitted_by = s.roll_number
//       LEFT JOIN Assignments assign ON assign.complaint_FK = c.id
//       LEFT JOIN Engineers e ON assign.engineer_FK = e.user_FK
//       LEFT JOIN Users u_e ON e.user_FK = u_e.user_PK
//       LEFT JOIN Admin a ON assign.admin_FK = a.user_FK
//       LEFT JOIN Users u_a ON a.user_FK = u_a.user_PK
//       LEFT JOIN Feedback f ON f.complaint_FK = c.id
//       WHERE c.id = ?
//     `, [complaintId]);

//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Complaint not found" });
//     }

//     res.json(rows[0]);
//   } catch (err) {
//     console.error("❌ Error fetching complaint details:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const getComplaintDetails = async (req, res) => {
  try {
    const complaintId = req.params.id;

    // Get complaint + joined metadata
    const [complaintRows] = await db.execute(`
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

    if (complaintRows.length === 0) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    const complaint = complaintRows[0];

    // Get follow-ups
    const [followups] = await db.execute(`
      SELECT id, complaint_FK, visit_date, visit_time, visit_type, work_done, parts_replaced
      FROM complaint_visits
      WHERE complaint_FK = ? and visit_type = 'follow-up'
      ORDER BY visit_date ASC, visit_time ASC
    `, [complaintId]);

    complaint.followups = followups;

    res.json(complaint);
  } catch (err) {
    console.error("❌ Error fetching complaint details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = {
  getAllComplaints,
  getComplaintDetails
};
