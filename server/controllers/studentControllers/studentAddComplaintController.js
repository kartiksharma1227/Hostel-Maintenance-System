// // const pool = require("../../db/connection");
// // const mailSender = require("../utils/mailSender");

// // const createStudentComplaint = async (req, res, next) => {
// //   try {
// //     const {
// //       room_FK,
// //       title,
// //       category,
// //       priority,
// //       location,
// //       description,
// //       submitted_by,
// //       user_PK
// //     } = req.body;

// //     if (!room_FK || !title || !category || !priority || !location || !description || !submitted_by) {
// //       return res.status(400).json({ error: "All fields are required" });
// //     }

// //     // Insert Complaint
// //     const complaintSql = `
// //       INSERT INTO Complaints
// //         (room_FK, title, category, priority,
// //          location, description, status,
// //          created_at, updated_at, submitted_by)
// //       VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW(), ?)
// //     `;

// //     const [complaintResult] = await pool.execute(complaintSql, [
// //       room_FK,
// //       title,
// //       category,
// //       priority,
// //       location,
// //       description,
// //       submitted_by
// //     ]);

// //     const complaintId = complaintResult.insertId;

    

// //       // Insert notification for student
// //       const notificationSql = `
// //         INSERT INTO Notifications 
// //         (message, read_status, user_FK, created_at, updated_at)
// //         VALUES (?, FALSE, ?, NOW(), NOW())
// //       `;

// //       const notificationMessage = `Your complaint titled '${title}' has been submitted with status 'Pending'.`;

// //       await pool.execute(notificationSql, [notificationMessage, user_PK]);
// //     // }

// //     // Respond success
// //     res.status(201).json({ complaintId });

// //   } catch (err) {
// //     console.error("Error in createStudentComplaint:", err);
// //     next(err);
// //   }
// // };

// // module.exports = { createStudentComplaint };


// const pool = require("../../db/connection");
// const mailSender = require("../utils/mailSender");

// const createStudentComplaint = async (req, res, next) => {
//   try {
//     const {
//       room_FK,
//       title,
//       category,
//       priority,
//       location,
//       description,
//       submitted_by,
//       user_PK,
//       user_email // 👈 make sure this comes from frontend request
//     } = req.body;

//     if (!room_FK || !title || !category || !priority || !location || !description || !submitted_by || !user_email) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     // Insert Complaint
//     const complaintSql = `
//       INSERT INTO Complaints
//         (room_FK, title, category, priority,
//          location, description, status,
//          created_at, updated_at, submitted_by)
//       VALUES (?, ?, ?, ?, ?, ?, 'Pending', NOW(), NOW(), ?)
//     `;

//     const [complaintResult] = await pool.execute(complaintSql, [
//       room_FK,
//       title,
//       category,
//       priority,
//       location,
//       description,
//       submitted_by
//     ]);

//     const complaintId = complaintResult.insertId;

//     // Insert notification for student
//     const notificationSql = `
//       INSERT INTO Notifications 
//       (message, read_status, user_FK, created_at, updated_at)
//       VALUES (?, FALSE, ?, NOW(), NOW())
//     `;

//     const notificationMessage = `Your complaint titled '${title}' has been submitted with status 'Pending'.`;

//     await pool.execute(notificationSql, [notificationMessage, user_PK]);

//     // Send complaint email to student 📧
//     await mailSender(
//       user_email,
//       "Complaint Registered ✔️",
//       `<div style="font-family:Arial,sans-serif;font-size:14px;">
//          <h3 style="color:#333;">Hi ${submitted_by},</h3>
//          <p>Your complaint titled <strong>${title}</strong> has been successfully registered in the Hostel Maintenance System.</p>
//          <p><strong>Status:</strong> Pending</p>
//          <p>Our team will address it shortly.</p>
//          <br/>
//          <p style="color:gray;">Regards,<br/>Hostel Maintenance System</p>
//        </div>`
//     );

//     // Respond success
//     res.status(201).json({ complaintId });

//   } catch (err) {
//     console.error("Error in createStudentComplaint:", err);
//     next(err);
//   }
// };

// module.exports = { createStudentComplaint };


const pool = require("../../db/connection");
const mailSender = require("../../utils/mailSender");

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

    // Insert notification for student
    const notificationSql = `
      INSERT INTO Notifications 
      (message, read_status, user_FK, created_at, updated_at)
      VALUES (?, FALSE, ?, NOW(), NOW())
    `;

    const notificationMessage = `Your complaint titled '${title}' has been submitted with status 'Pending'.`;
    await pool.execute(notificationSql, [notificationMessage, user_PK]);

    // Fetch student's email using submitted_by (roll_number)
    const [userResult] = await pool.execute(
      `SELECT u.mail_UN 
       FROM Users u
       JOIN Students s ON u.user_PK = s.user_FK
       WHERE s.roll_number = ?`,
      [submitted_by]
    );

    if (userResult.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user_email = userResult[0].mail_UN;
    
    // Send complaint email to student
    await mailSender(
      user_email,
      "Complaint Registered ✔️",
      `<div style="font-family:Arial,sans-serif;font-size:14px;">
         <h3 style="color:#333;">Dear ${submitted_by},</h3>
         <p>Your complaint titled <strong>${title}</strong> has been successfully registered in the Hostel Maintenance System.</p>
         <p><strong>Status:</strong> Pending</p>
         <p>Our team will address it shortly.</p>
         <br/>
         <p style="color:gray;">Regards,<br/>Hostel Maintenance System</p>
       </div>`
    );

    // Respond success
    res.status(201).json({ complaintId });

  } catch (err) {
    console.error("Error in createStudentComplaint:", err);
    next(err);
  }
};

module.exports = { createStudentComplaint };
