// // File: Server/controllers/authController.js

// const db = require('../db/connection');

// exports.studentLogin = async (req, res) => {
//   try {
//     const { rollno, password } = req.body;

//     if (!rollno || !password) {
//       return res.status(400).json({ error: 'Roll number and password are required' });
//     }

//     const [results] = await db.query(
//       `
//       SELECT u.* 
//       FROM Students s
//       JOIN Users u ON s.user_FK = u.user_PK
//       WHERE s.roll_number = ?
//       `,
//       [rollno]
//     );

//     const [studentResults] = await db.query(
//       `
//       SELECT room_FK
//       FROM Students 
//       WHERE roll_number = ?
//       `,
//       [rollno]
//     );

//     console.log("Student Results:", studentResults);
//     console.log("Results:", results);

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = results[0];

//     // Plain-text password comparison (use bcrypt in production!)
//     if (password !== user.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     res.json({
//       message: 'Login successful',
//       user: {
//         ...user,
//         user_PK: user.user_PK,
//         room_FK: studentResults[0]?.room_FK,
//       },
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// };


// File: Server/controllers/authController.js

const db = require('../db/connection');

exports.studentLogin = async (req, res) => {
  try {
    let { rollno, password } = req.body;
    
    // Validate input fields
    if (!rollno || !password) {
      return res.status(400).json({ error: 'Roll number and password are required' });
    }

    // Convert roll number to uppercase for consistent comparison
    rollno = rollno.toUpperCase();

    // Fetch user details by roll number
    const [results] = await db.query(
      `
      SELECT u.* 
      FROM Students s
      JOIN Users u ON s.user_FK = u.user_PK
      WHERE s.roll_number = ?
      `,
      [rollno]
    );

    // If no user found, respond with invalid credentials
    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Plain-text password comparison (for testing — replace with bcrypt in production)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fetch student room allocation using the same uppercase roll number
    const [studentResults] = await db.query(
      `
      SELECT room_FK
      FROM Students 
      WHERE roll_number = ?
      `,
      [rollno]
    );

    // Return success response with user details and room allocation
    res.json({
      message: 'Login successful',
      user: {
        ...user,
        user_PK: user.user_PK,
        room_FK: studentResults[0]?.room_FK || null,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
};
