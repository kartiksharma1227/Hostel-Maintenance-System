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

module.exports = {
  getAssignedComplaints,
  getCompletedComplaints
};
