// controllers/engineerControllers/engineerComplaintController.js
const pool = require('../../db');
const nodemailer = require('nodemailer');

exports.updateComplaintByEngineer = async (req, res) => {
  const engineerId = req.params.id;
  const {
    complaintId,
    status,
    description,
    scheduled_visit_date,
    scheduled_visit_time,
    visit_type,
    work_done,
    parts_replaced,
    triggerCompletionFlow
  } = req.body;

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    // 1. Update complaint status & scheduling
    await conn.query(
      `UPDATE Complaints SET status = ?, description = ?, scheduled_visit_date = ?, scheduled_visit_time = ?, updated_at = NOW() WHERE id = ?`,
      [status, description, scheduled_visit_date, scheduled_visit_time, complaintId]
    );

    // 2. Insert into complaint_visits
    await conn.query(
      `INSERT INTO complaint_visits (complaint_FK, visit_date, visit_time, visit_type, work_done, parts_replaced, outcome)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [complaintId, scheduled_visit_date, scheduled_visit_time, visit_type, work_done, parts_replaced, description || '']
    );

    // If status is Completed: trigger full closure logic
    if (triggerCompletionFlow && status === 'Completed') {
      // 3. Get student & admin details for notifications and email
      const [[student]] = await conn.query(
        `SELECT s.roll_number, u.mail_UN, u.name FROM Students s JOIN Users u ON s.user_FK = u.user_PK
         JOIN Complaints c ON c.submitted_by = u.user_PK WHERE c.id = ?`,
        [complaintId]
      );

      const [[admin]] = await conn.query(
        `SELECT a.user_FK, u.name FROM Assignments a JOIN Users u ON a.admin_FK = u.user_PK WHERE a.complaint_FK = ?`,
        [complaintId]
      );

      // 4. Delete from Assignments table
      await conn.query(`DELETE FROM Assignments WHERE complaint_FK = ?`, [complaintId]);

      // 5. Insert notifications
      await conn.query(
        `INSERT INTO Notifications (message, read_status, user_FK, created_at, updated_at) VALUES (?, 0, ?, NOW(), NOW())`,
        [
          `Complaint #${complaintId} marked completed. Please submit your feedback.`,
          student.roll_number
        ]
      );
      await conn.query(
        `INSERT INTO Notifications (message, read_status, user_FK, created_at, updated_at) VALUES (?, 0, ?, NOW(), NOW())`,
        [
          `Complaint #${complaintId} has been marked as completed by Engineer #${engineerId}.`,
          admin.user_FK
        ]
      );

      // 6. Send email to student for feedback
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: student.mail_UN,
        subject: 'Your complaint has been resolved — please give feedback',
        html: `<p>Hi ${student.name},</p>
               <p>Your complaint #${complaintId} has been marked as <strong>Completed</strong>.</p>
               <p>Please visit your dashboard to provide feedback.</p>
               <br /><p>Regards,<br />EstateEdge Team</p>`
      });
    }

    await conn.commit();
    res.status(200).json({ message: 'Complaint updated successfully.' });
  } catch (error) {
    await conn.rollback();
    console.error('Error in updateComplaintByEngineer:', error);
    res.status(500).json({ message: 'Failed to update complaint.' });
  } finally {
    conn.release();
  }
};
