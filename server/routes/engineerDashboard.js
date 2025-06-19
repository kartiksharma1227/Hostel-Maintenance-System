const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /api/engineer-dashboard/pending-complaints/:engineerId
router.get('/pending-complaints/:engineerId', async (req, res) => {
  const { engineerId } = req.params;
  try {
    // Get complaints that need engineer's attention but are not yet assigned
    const [rows] = await db.query(`
      SELECT 
        c.id,
        c.title,
        c.category,
        c.description,
        c.location,
        c.priority,
        c.status,
        c.created_at as reportDate


      FROM Complaints c
      JOIN Students s ON c.submitted_by= s.roll_number
      WHERE c.status = 'Pending'
      AND c.id NOT IN (SELECT complaint_FK FROM Assignments)
      ORDER BY 
        CASE 
          WHEN c.priority = 'high' THEN 1
          WHEN c.priority = 'medium' THEN 2
          WHEN c.priority = 'low' THEN 3
          ELSE 4
        END,
        c.created_at DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching pending complaints:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET /api/engineer-dashboard/assigned-complaints/:engineerId
router.get('/assigned-complaints/:engineerId', async (req, res) => {
  const { engineerId } = req.params;
  try {
    // Get complaints assigned to this engineer that are not completed
    const [rows] = await db.query(`

      SELECT c.*, a.* 
      FROM Complaints c
      JOIN Assignments a ON a.complaint_FK = c.id
      where engineer_FK = ?

    

    `, [engineerId]);

    // // For each complaint, get comments and visit history
    // const completeData = await Promise.all(rows.map(async (complaint) => {
    //   // Get comments for this complaint
    //   const [comments] = await db.query(`
    //     SELECT 
    //       DATE(created_at) as date,
    //       comment as text
    //     FROM complaint_comments
    //     WHERE complaint_FK = ?
    //     ORDER BY created_at DESC
    //   `, [complaint.id]);

    //   // Get visit history for this complaint
    //   const [visitHistory] = await db.query(`
    //     SELECT 
    //       DATE(visit_date) as date,
    //       TIME_FORMAT(visit_time, '%h:%i %p') as time,
    //       visit_type as type,
    //       work_done as workDone,
    //       parts_replaced as partsReplaced,
    //       outcome
    //     FROM complaint_visits
    //     WHERE complaint_FK = ?
    //     ORDER BY visit_date DESC, visit_time DESC
    //   `, [complaint.id]);

    //   return {
    //     ...complaint,
    //     comments: comments || [],
    //     visitHistory: visitHistory || []
    //   };
    // }));

    res.json(rows);
  } catch (err) {
    console.error('Error fetching assigned complaints:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET /api/engineer-dashboard/completed-complaints/:engineerId
router.get('/completed-complaints/:engineerId', async (req, res) => {
  const { engineerId } = req.params;
  try {
    // Get completed complaints that were assigned to this engineer
    const [rows] = await db.query(`
      SELECT 
        c.id,
        c.title,
        c.category,
        c.description,
        c.location,
        c.status,
        c.priority,
        c.created_at as reportDate,
        a.assigned_date as assignedDate,
        c.completed_date as completedDate,
        c.updated_at as lastUpdated,
        s.roll_number as studentName

      FROM Complaints c
      JOIN Assignments a ON c.id = a.complaint_FK
      JOIN Students s ON c.submitted_by = s.roll_number
      WHERE a.engineer_FK = ? AND c.status = 'Completed'
      ORDER BY c.completed_date DESC
    `, [engineerId]);

    // For each complaint, get feedback, comments, and visit history
    const completeData = await Promise.all(rows.map(async (complaint) => {
      // Get feedback for this complaint
      const [feedbackRows] = await db.query(`
        SELECT 
          rating,
          text
        FROM feedback
        WHERE complaint_FK = ?
        LIMIT 1
      `, [complaint.id]);

      // Get comments for this complaint
      const [comments] = await db.query(`
        SELECT 
          DATE(created_at) as date,
          comment as text
        FROM complaint_comments
        WHERE complaint_FK = ?
        ORDER BY created_at DESC
      `, [complaint.id]);

      // Get visit history for this complaint
      const [visitHistory] = await db.query(`
        SELECT 
          DATE(visit_date) as date,
          TIME_FORMAT(visit_time, '%h:%i %p') as time,
          visit_type as type,
          work_done as workDone,
          parts_replaced as partsReplaced,
          outcome
        FROM complaint_visits
        WHERE complaint_FK = ?
        ORDER BY visit_date DESC, visit_time DESC
      `, [complaint.id]);

      return {
        ...complaint,
        feedback: feedbackRows.length > 0 ? feedbackRows[0] : null,
        comments: comments || [],
        visitHistory: visitHistory || []
      };
    }));

    res.json(completeData);
  } catch (err) {
    console.error('Error fetching completed complaints:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET /api/engineer-dashboard/scheduled-visits/:engineerId
router.get('/scheduled-visits/:engineerId', async (req, res) => {

  const { engineerId } = req.params;
  console.log('Fetching scheduled visits for engineer:', engineerId);
  try {
    // Get scheduled visits for this engineer
    const [rows] = await db.query(`
      SELECT 
        c.id,
        c.title,
        c.location,
        DATE(c.scheduled_visit_date) as date,
        TIME_FORMAT(c.scheduled_visit_time, '%h:%i %p') as time
      FROM Complaints c
      JOIN Assignments a ON c.id = a.complaint_FK
      WHERE a.engineer_FK = ? 
      AND c.scheduled_visit_date IS NOT NULL
      AND c.status != 'Completed'
      ORDER BY c.scheduled_visit_date, c.scheduled_visit_time
    `, [engineerId]);
    
    res.json(rows);
  } catch (err) {
    console.error('Error fetching scheduled visits:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// GET /api/engineer-dashboard/notifications/:engineerId
router.get('/notifications/:engineerId', async (req, res) => {
  const { engineerId } = req.params;
  try {
    // Get notifications for this engineer
    const [rows] = await db.query(`
      SELECT 
        n.notification_PK,
        n.message,
        n.read_status as \`Read\`,
        CASE
          WHEN TIMESTAMPDIFF(MINUTE, n.created_at, NOW()) < 60 THEN CONCAT(TIMESTAMPDIFF(MINUTE, n.created_at, NOW()), ' minutes ago')
          WHEN TIMESTAMPDIFF(HOUR, n.created_at, NOW()) < 24 THEN CONCAT(TIMESTAMPDIFF(HOUR, n.created_at, NOW()), ' hours ago')
          ELSE CONCAT(TIMESTAMPDIFF(DAY, n.created_at, NOW()), ' days ago')
        END as time
      FROM notifications n
      WHERE n.user_FK= ?
      ORDER BY n.created_at DESC
      LIMIT 20
    `, [engineerId]);
    
    res.json(rows);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// PUT /api/engineer-dashboard/update-complaint
router.put('/update-complaint', async (req, res) => {
  const { 
    complaintId, 
    status, 
    workDone, 
    partsReplaced, 
    nextVisitDate,
    comments 
  } = req.body;
  
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    
    // Update complaint status and scheduled visit if applicable
    let query = 'UPDATE Complaints SET status = ?, updated_at = NOW()';
    let params = [status];
    
    if (nextVisitDate) {
      query += ', scheduled_visit_date = ?';
      params.push(nextVisitDate);
    }
    
    if (status === 'Completed') {
      query += ', completed_date = NOW()';
    }
    
    query += ' WHERE id = ?';
    params.push(complaintId);
    
    await conn.query(query, params);
    
    // Add comment if provided
    if (comments) {
      await conn.query(
        'INSERT INTO complaint_comments (complaint_FK, comment, created_at) VALUES (?, ?, NOW())',
        [complaintId, comments]
      );
    }
    
    // Add visit record
    const visitType = status === 'Completed' ? 'final' : 'follow-up';
    await conn.query(
      `INSERT INTO complaint_visits 
        (complaint_FK, visit_date, visit_time, visit_type, work_done, parts_replaced, outcome) 
       VALUES (?, CURDATE(), CURTIME(), ?, ?, ?, ?)`,
      [complaintId, visitType, workDone || '', partsReplaced || '', status]
    );
    
    await conn.commit();
    res.json({ message: 'Complaint updated successfully' });
  } catch (err) {
    await conn.rollback();
    console.error('Error updating complaint:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  } finally {
    conn.release();
  }
});

// PUT /api/engineer-dashboard/accept-complaint
router.put('/accept-complaint', async (req, res) => {
  const { complaintId, engineerId } = req.body;
  
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    
    // Update complaint status
    await conn.query(
      'UPDATE Complaints SET status = ?, updated_at = NOW() WHERE id = ?',
      ['Pending', complaintId]
    );
    
    // Create assignment
    await conn.query(
      'INSERT INTO Assignments (complaint_FK, engineer_FK, assigned_date) VALUES (?, ?, NOW())',
      [complaintId, engineerId]
    );
    
    await conn.commit();
    res.json({ message: 'Complaint accepted successfully' });
  } catch (err) {
    await conn.rollback();
    console.error('Error accepting complaint:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  } finally {
    conn.release();
  }
});

// PUT /api/engineer-dashboard/reject-complaint
router.put('/reject-complaint', async (req, res) => {
  const { complaintId } = req.body;
  
  try {
    // Update complaint status
    await db.query(
      'UPDATE Complaints SET status = ?, updated_at = NOW() WHERE id = ?',
      ['Rejected', complaintId]
    );
    
    res.json({ message: 'Complaint rejected successfully' });
  } catch (err) {
    console.error('Error rejecting complaint:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// PUT /api/engineer-dashboard/mark-notification-read
router.put('/mark-notification-read', async (req, res) => {
  const { notificationId } = req.body;
  
  try {
    await db.query(
      'UPDATE notifications SET is_read = 1 WHERE id = ?',
      [notificationId]
    );
    
    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

// PUT /api/engineer-dashboard/mark-all-notifications-read
router.put('/mark-all-notifications-read', async (req, res) => {
  const { engineerId } = req.body;
  
  try {
    await db.query(
      'UPDATE notifications SET is_read = 1 WHERE recipient_FK = ?',
      [engineerId]
    );
    
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Error marking all notifications as read:', err);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;
