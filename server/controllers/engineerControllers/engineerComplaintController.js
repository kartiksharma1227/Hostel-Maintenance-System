// controllers/engineerControllers/engineerComplaintController.js
const db = require('../../db/connection');
const mailSender = require("../../utils/mailSender");


const getAssignedComplaints = async (req, res) => {
  const engineerId = req.params.id; // from JWT

  try {
    const [rows] = await db.query(
      `SELECT c.*, a.assigned_date,a.admin_FK
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
  const engineerId = req.params.id; // from JWT or route


  try {
    const [rows] = await db.query(
      `
      SELECT 
        c.*, 
        c.completed_date,
        f.rating
      FROM Complaints c
      LEFT JOIN Feedback f ON c.id = f.complaint_fk
      WHERE c.completed_by = ? AND c.status = 'Completed'
      ORDER BY c.completed_date DESC
      `,
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
        
      
      c.id ,
        c.title,
        c.description,
        c.category,
        c.status,
        c.submitted_by,
        c.created_at
        
      FROM assignments a
      JOIN complaints c ON c.id = a.complaint_FK
     
      WHERE a.engineer_FK = ? AND a.status = 'Pending'
      
    `, [engineerId]);


    res.status(200).json({ pendingAssignments: assignments });
  } catch (err) {
    console.error("Error fetching pending assignments:", err);
    res.status(500).json({ error: "Server error while fetching pending assignments" });
  }
};

// Function to accept a complaint assignment
const acceptComplaint = async (req, res) => {
  const { complaintId, engineerId ,adminUserId} = req.body;


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
    const message = `Engineer ${engineerId} rejected Complaint #${complaintId}. Kindly assign it to another engineer.`;
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

// Function to update a complaint by an engineer
const updateComplaintByEngineer = async (req, res) => {
  const {
    complaintId,
    status,
    description,
    scheduled_visit_date,
    scheduled_visit_time,
    visit_type,
    work_done,
    parts_replaced,
    adminUserId,
    
  } = req.body;

  const engineerId = req.params.id; 


  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Update complaint main status and scheduled time
    await connection.query(
      `UPDATE complaints 
       SET status = ?, 
           scheduled_visit_date = ?, 
           scheduled_visit_time = ?, 
           completed_by = ?,
           completed_date = IF(? = 'Completed', NOW(), completed_date),
           updated_at = NOW()
       WHERE id = ?`,
      [status, scheduled_visit_date || null, scheduled_visit_time || null, engineerId,status, complaintId]
    );

    // 2. Insert into complaint_visits if work was done
    if (work_done || parts_replaced || visit_type) {
      await connection.query(
        `INSERT INTO complaint_visits 
         (complaint_FK, visit_date, visit_time, visit_type, work_done, parts_replaced) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          complaintId,
          scheduled_visit_date || new Date(),
          scheduled_visit_time || "00:00",
          visit_type || "general",
          work_done || "",
          parts_replaced || "",
        ]
      );
    }

    // 3. Insert engineer's comment
    if (description) {
      await connection.query(
        `INSERT INTO complaint_comments 
         (complaint_FK, comment, created_at) 
         VALUES (?, ?, NOW())`,
        [complaintId, description]
      );
    }

    
    // 🔹 4. Insert Notification for Admin
    const message = `Complaint #${complaintId} updated by engineer. Status: ${status}${
      scheduled_visit_date ? ` | Scheduled Visit: ${scheduled_visit_date} ${scheduled_visit_time || ""}` : ""
    }${work_done ? ` | Work Done: ${work_done}` : ""}${
      parts_replaced ? ` | Parts: ${parts_replaced}` : ""
    }`;

    await connection.query(
      `INSERT INTO notifications (message, read_status, user_FK, created_at, updated_at)
       VALUES (?, false, ?, NOW(), NOW())`,
      [message, adminUserId]
    );


    // 5. If complaint is completed
    if (status.toLowerCase() === "completed") {
      // 5.1 Delete from assignments
      // await connection.query(
      //   `DELETE FROM assignments WHERE complaint_FK = ?`,
      //   [complaintId]
      // );

      // 5.2 Get student's user_FK and email
      const [studentResult] = await connection.query(
        `SELECT u.mail_UN, u.user_PK
         FROM complaints c
         JOIN students s ON c.submitted_by = s.roll_number
         JOIN users u ON s.user_FK = u.user_PK
         WHERE c.id = ?`,
        [complaintId]
      );

      if (studentResult.length > 0) {
        const { mail_UN, user_PK } = studentResult[0];

        // 5.3 Insert notification for student
        await connection.query(
          `INSERT INTO notifications (message, read_status, user_FK, created_at, updated_at)
           VALUES (?, false, ?, NOW(), NOW())`,
          [
            `Complaint #${complaintId} marked as completed. Please submit feedback.`,
            user_PK,
          ]
        );

        // 5.4 Send feedback request email
        await mailSender(
  mail_UN,
  "Your Complaint has been Resolved - Feedback Requested",
  `
    <p>Hello,</p>
    <p>Your complaint with ID <strong>${complaintId}</strong> has been marked as <strong>Completed</strong> by the engineer.</p>
    <p>Please <a href="https://your-feedback-url.com">click here</a> to submit your feedback.</p>
    <p>Thank you!</p>
  `
);

      }
    }
    await connection.commit();
    res.status(200).json({ message: "Complaint updated successfully." });
  } catch (err) {
    await connection.rollback();
    console.error("Error updating complaint:", err);
    res.status(500).json({ error: "Server error while updating complaint." });
  } finally {
    connection.release();
  }
};
module.exports = {
  getAssignedComplaints,
  getCompletedComplaints,
  getPendingAssignmentsForEngineer,
  acceptComplaint,
  rejectComplaint,updateComplaintByEngineer
};
