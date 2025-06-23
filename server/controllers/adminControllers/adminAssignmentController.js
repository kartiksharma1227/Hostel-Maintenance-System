const db = require('../../db/connection');


const assignEngineer = async (req, res) => {
  const { complaintId, engineerId, note, adminId } = req.body;

  if (!complaintId || !engineerId || !adminId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [existing] = await db.query(`
      SELECT * FROM Assignments 
      WHERE complaint_FK = ? AND status = 'Rejected'
    `, [complaintId]);

    if (existing.length > 0) {
      await db.query(`
        UPDATE Assignments 
        SET engineer_FK = ?, admin_FK = ?, assigned_date = NOW(), status = 'Pending'
        WHERE complaint_FK = ? AND status = 'Rejected'
      `, [engineerId, adminId, complaintId]);
    } else {
      await db.query(`
        INSERT INTO Assignments (complaint_FK, engineer_FK, admin_FK, assigned_date, status)
        VALUES (?, ?, ?, NOW(), 'Pending')
      `, [complaintId, engineerId, adminId]);
    }

    //  Notification sent to engineer
    await db.query(`
      INSERT INTO notifications (user_FK, message, created_at)
      VALUES (?, ?, NOW())
    `, [
      engineerId,
      `You have been assigned a new complaint (ID: ${complaintId}) by Admin ${adminId}.Accept or reject the complaint`,
    ]);

    res.status(201).json({ message: "Engineer assigned successfully" });
  } catch (error) {
    console.error("Assignment Error:", error);
    res.status(500).json({ message: "Failed to assign engineer" });
  }
};



// All exports at the end
module.exports = {
  assignEngineer
};
