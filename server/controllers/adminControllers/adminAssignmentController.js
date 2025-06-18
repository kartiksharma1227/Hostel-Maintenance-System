const db = require('../../db/connection');

const assignEngineer = async (req, res) => {
  const { complaintId, engineerId, note } = req.body;
  console.log('⏳  POST /api/admin/assignments body:', req.body);

  if (!complaintId || !engineerId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await db.execute(
      `INSERT INTO assignments (complaint_FK, engineer_FK) VALUES (?, ?)`,
      [complaintId, engineerId]
    );

    await db.execute(`UPDATE complaints SET status = ? WHERE id = ?`, [
      "In Progress",
      complaintId,
    ]);

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
