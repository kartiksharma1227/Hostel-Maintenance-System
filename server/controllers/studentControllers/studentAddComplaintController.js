// const pool = require("../../db/connection");


// const createStudentComplaint = async (req, res, next) => {
//   try {
//     const {
//       room_FK,
//       title,
//       category,
//       priority,
//       location,
//       description,
//       submitted_by
//     } = req.body;

//     if (!room_FK || !title || !category || !priority || !location || !description || !submitted_by) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const sql = `
//       INSERT INTO Complaints
//         (room_FK, title, category, priority,
//          location, description, status,
//          created_at, updated_at, submitted_by)
//       VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW(), ?)
//     `;

//     const [result] = await pool.execute(sql, [
//       room_FK,
//       title,
//       category,
//       priority,
//       location,
//       description,
//       submitted_by
//     ]);

//     res.status(201).json({ complaintId: result.insertId });
//   } catch (err) {
//     console.error("Error in createComplaint:", err);
//     next(err);
//   }
// };

// module.exports = { createStudentComplaint };

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
      submitted_by,
      user_PK
    } = req.body;

    if (!room_FK || !title || !category || !priority || !location || !description || !submitted_by) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Insert Complaint
    const complaintSql = `
      INSERT INTO Complaints
        (room_FK, title, category, priority,
         location, description, status,
         created_at, updated_at, submitted_by)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW(), ?)
    `;

    const [complaintResult] = await pool.execute(complaintSql, [
      room_FK,
      title,
      category,
      priority,
      location,
      description,
      submitted_by
    ]);

    const complaintId = complaintResult.insertId;

    // Find user_PK via submitted_by roll number
    // const [userResult] = await pool.execute(
    //   `SELECT u.user_PK 
    //    FROM Students s 
    //    JOIN Users u ON s.user_FK = u.user_PK 
    //    WHERE s.roll_number = ?`,
    //   [submitted_by]
    // );

    // if (userResult.length > 0) {
      // const userI = userResult[0].user_PK;

      // Insert notification for student
      const notificationSql = `
        INSERT INTO Notifications 
        (message, read_status, user_FK, created_at, updated_at)
        VALUES (?, FALSE, ?, NOW(), NOW())
      `;

      const notificationMessage = `Your complaint titled '${title}' has been submitted with status 'Pending'.`;

      await pool.execute(notificationSql, [notificationMessage, user_PK]);
    // }

    // Respond success
    res.status(201).json({ complaintId });

  } catch (err) {
    console.error("Error in createStudentComplaint:", err);
    next(err);
  }
};

module.exports = { createStudentComplaint };
