const db = require('../../db/connection');

const assignEngineer = async (req, res) => {
  const { complaintId, engineerId, note } = req.body;
  console.log('⏳  POST /api/admin/assignments body:', req.body);

  if (!complaintId || !engineerId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    
const [result] = await db.query(`
  INSERT INTO assignment (complaint_id, engineer_id, assigned_at, status)
  VALUES (?, ?, NOW(), 'Pending')
`, [complaintId, engineerId]);
    
  await db.query(`
  INSERT INTO notifications (user_id, message, created_at, type)
  VALUES (?, ?, NOW(), 'assignment')
`, [engineerId, `You have been assigned a new complaint (ID: ${complaintId}). Please respond.`]);

    res.status(201).json({ message: "Engineer assigned successfully" });
  } catch (error) {
    console.error("Assignment Error:", error);
    res.status(500).json({ message: "Failed to assign engineer" });
  }
};

// 👇 All exports at the end
module.exports = {
  assignEngineer
};
