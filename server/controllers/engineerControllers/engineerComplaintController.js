// controllers/engineerControllers/engineerComplaintController.js
const db = require('../../db/connection');

const getAssignedComplaints = async (req, res) => {
  const engineerId = req.params.id; // from JWT
  console.log("engineerId:", engineerId);
  try {
    const [rows] = await db.query(
      `SELECT c.*, a.assigned_date
       FROM Complaints c
       JOIN Assignments a ON c.id = a.complaint_FK
       WHERE a.engineer_FK = ? AND c.status IN ('Assigned', 'In Progress')`,
      [engineerId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getCompletedComplaints = async (req, res) => {
  const engineerId = req.params.id; // from JWT
  console.log("engineerId:", engineerId);
  try {
    const [rows] = await db.query(
      `SELECT c.*, a.assigned_date, c.completed_date
       FROM Complaints c
       JOIN Assignments a ON c.id = a.complaint_FK
       WHERE a.engineer_FK = ? AND c.status = 'Completed'`,
      [engineerId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

const getPendingAssignmentsForEngineer = async (req, res) => {
  try {
    const engineerId = req.params.id; // comes from token middleware

    const [assignments] = await db.query(`
      SELECT 
      a.admin_FK,
      a.assigned_date,
      c.room_FK,
      c.priority,
      c.location,
        
      
      c.id AS complaint_id,
        c.title,
        c.description
        
        
      FROM assignments a
      JOIN complaints c ON c.id = a.complaint_FK
     
      WHERE a.engineer_FK = ? AND a.status = 'Pending'
      
    `, [engineerId]);
console.log(Array.isArray(assignments)); // Should log true

    res.status(200).json({ pendingAssignments: assignments });
  } catch (err) {
    console.error("Error fetching pending assignments:", err);
    res.status(500).json({ error: "Server error while fetching pending assignments" });
  }
};

module.exports = {
  getAssignedComplaints,
  getCompletedComplaints,getPendingAssignmentsForEngineer
};
