const db = require('../../db/connection');

// const assignEngineer = async (req, res) => {
//   const { complaintId, engineerId, note } = req.body;
//   console.log('⏳  POST /api/admin/assignments body:', req.body);

//   if (!complaintId || !engineerId) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
    
// const [result] = await db.query(`
//   INSERT INTO Assignments (complaint_FK, engineer_FK, assigned_date, status)
//   VALUES (?, ?, NOW(), 'Pending')
// `, [complaintId, engineerId]);
    
//   await db.query(`
//   INSERT INTO notifications (user_FK, message, created_at)
//   VALUES (?, ?, NOW())
// `, [engineerId, `You have been assigned a new complaint (ID: ${complaintId}). Please accept or reject the complaint.`]);

//     res.status(201).json({ message: "Engineer assigned successfully" });
//   } catch (error) {
//     console.error("Assignment Error:", error);
//     res.status(500).json({ message: "Failed to assign engineer" });
//   }
// };
// const assignEngineer = async (req, res) => {
//   const { complaintId, engineerId, note } = req.body;
//   // const engineerId = admin_FK;
//   if (!complaintId || !engineerId) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     // Check if a rejected assignment exists for this complaint
//     const [existing] = await db.query(`
//       SELECT * FROM Assignments 
//       WHERE complaint_FK = ? AND status = 'Rejected'
//     `, [complaintId]);

//     if (existing.length > 0) {
//       // Update the rejected assignment to new engineer and status pending
//       await db.query(`
//         UPDATE Assignments 
//         SET engineer_FK = ?, assigned_date = NOW(), status = 'Pending'
//         WHERE complaint_FK = ? AND status = 'Rejected'
//       `, [engineerId, complaintId]);
//     } else {
//       // Create new assignment
//       await db.query(`
//         INSERT INTO Assignments (complaint_FK, engineer_FK, assigned_date, status)
//         VALUES (?, ?, NOW(), 'Pending')
//       `, [complaintId, engineerId]);
//     }

//     // Insert notification
//     await db.query(`
//       INSERT INTO notifications (user_FK, message, created_at)
//       VALUES (?, ?, NOW())
//     `, [engineerId, `You have been assigned a new complaint (ID: ${complaintId}). Please accept or reject the complaint.`]);

//     res.status(201).json({ message: "Engineer assigned successfully" });
//   } catch (error) {
//     console.error("Assignment Error:", error);
//     res.status(500).json({ message: "Failed to assign engineer" });
//   }
// };
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

    // ✅ Notification sent to engineer
    await db.query(`
      INSERT INTO notifications (user_FK, message, created_at)
      VALUES (?, ?, NOW())
    `, [
      engineerId,
      `You have been assigned a new complaint (ID: ${complaintId}) by Admin ${adminId}.`,
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
