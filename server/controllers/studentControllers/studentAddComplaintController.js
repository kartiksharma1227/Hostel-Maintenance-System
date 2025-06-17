const pool = require("../../db/connection");


const createStudentComplaint = async (req, res, next) => {
  try {
    const {
      room_FK,
      title,
      category,
      priority,
      location,
      description,
      submitted_by
    } = req.body;

    if (!room_FK || !title || !category || !priority || !location || !description || !submitted_by) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = `
      INSERT INTO Complaints
        (room_FK, title, category, priority,
         location, description, status,
         created_at, updated_at, submitted_by)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW(), ?)
    `;

    const [result] = await pool.execute(sql, [
      room_FK,
      title,
      category,
      priority,
      location,
      description,
      submitted_by
    ]);

    res.status(201).json({ complaintId: result.insertId });
  } catch (err) {
    console.error("Error in createComplaint:", err);
    next(err);
  }
};

module.exports = { createStudentComplaint };
