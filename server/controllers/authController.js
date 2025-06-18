// const db = require('../db/connection');

// exports.studentLogin = async (req, res) => {
//   try {
//     let { rollno, password } = req.body;
    
//     // Validate input fields
//     if (!rollno || !password) {
//       return res.status(400).json({ error: 'Roll number and password are required' });
//     }

//     // Convert roll number to uppercase for consistent comparison
//     rollno = rollno.toUpperCase();

//     // Fetch user details by roll number
//     const [results] = await db.query(
//       `
//       SELECT u.* 
//       FROM Students s
//       JOIN Users u ON s.user_FK = u.user_PK
//       WHERE s.roll_number = ?
//       `,
//       [rollno]
//     );

//     // If no user found, respond with invalid credentials
//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = results[0];

//     // Plain-text password comparison (for testing — replace with bcrypt in production)
//     if (password !== user.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Fetch student room allocation using the same uppercase roll number
//     const [studentResults] = await db.query(
//       `
//       SELECT room_FK
//       FROM Students 
//       WHERE roll_number = ?
//       `,
//       [rollno]
//     );

//     // Return success response with user details and room allocation
//     res.json({
//       message: 'Login successful',
//       user: {
//         ...user,
//         user_PK: user.user_PK,
//         room_FK: studentResults[0]?.room_FK || null,
//       },
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// };



const db = require('../db/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.studentLogin = async (req, res) => {
  try {
    let { rollno, password } = req.body;

    if (!rollno || !password) {
      return res.status(400).json({ error: 'Roll number and password are required' });
    }

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

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];

    // Plain-text password comparison (replace with bcrypt in production)
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Fetch student's room allocation
    const [studentResults] = await db.query(
      `
      SELECT room_FK
      FROM Students 
      WHERE roll_number = ?
      `,
      [rollno]
    );

    const room_FK = studentResults[0]?.room_FK || null;

    // JWT payload with only user_PK, room_FK, roll_number
    const tokenPayload = {
      user_PK: user.user_PK,
      room_FK,
      roll_number: rollno,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRY || '1h',
    });

    // Send response with token only
    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
};
