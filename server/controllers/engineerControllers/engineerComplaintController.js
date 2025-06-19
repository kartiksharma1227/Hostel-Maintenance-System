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

// Function to accept a complaint assignment
const acceptComplaint = async (req, res) => {
  const { complaintId, engineerId ,adminUserId} = req.body;
  // console.log(req.body);

  try {
    // Update the assignment to Accepted
    await db.query(`
      UPDATE Assignments 
      SET status = 'Accepted', updated_at = NOW()
      WHERE complaint_FK = ? AND engineer_FK = ?
    `, [complaintId, engineerId]);

    // Update the complaint status to In Progress
    await db.query(`
      UPDATE Complaints 
      SET status = 'In Progress', updated_at = NOW()
      WHERE id = ?
    `, [complaintId]);
    const message = `Engineer ${engineerId} accepted Complaint #${complaintId}`;
    await db.query(`
      INSERT INTO Notifications (message, user_FK, created_at)
      VALUES (?, ?, NOW())
    `, [message, adminUserId]);

    res.json({ message: 'Complaint accepted successfully' });
  } catch (err) {
    console.error('Accept Error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const rejectComplaint = async (req, res) => {
  const { complaintId, engineerId,adminUserId } = req.body;
  console.log(req.body);

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Step 1: Mark assignment as rejected
    await conn.query(`
      UPDATE Assignments 
      SET status = 'Rejected', updated_at = NOW()
      WHERE complaint_FK = ? AND engineer_FK = ?
    `, [complaintId, engineerId]);

    

    // Step 3: Notify admin (replace <admin_user_id> appropriately)
    // const adminUserId = 1; // <-- You should replace this with real admin id logic if dynamic
    const message = `Engineer ${engineerId} rejected Complaint #${complaintId}`;
    await conn.query(`
      INSERT INTO Notifications (message, user_FK, created_at)
      VALUES (?, ?, NOW())
    `, [message, adminUserId]);

    await conn.commit();
    res.json({ message: 'Complaint rejected and admin notified.' });
  } catch (err) {
    await conn.rollback();
    console.error('Reject Error:', err);
    res.status(500).json({ error: 'Server Error' });
  } finally {
    conn.release();
  }
};

module.exports = {
  getAssignedComplaints,
  getCompletedComplaints,
  getPendingAssignmentsForEngineer,
  acceptComplaint,
  rejectComplaint
};
