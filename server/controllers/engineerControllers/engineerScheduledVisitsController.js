// controllers/engineerDashboard/engineerScheduledVisitsController.js
const db = require('../../db/connection');

// GET /api/engineer-dashboard/scheduled-visits/:engineerId
const getScheduledVisits = async (req, res) => {
  const { engineerId } = req.params;


  try {
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
};

module.exports = {
  getScheduledVisits,
};
