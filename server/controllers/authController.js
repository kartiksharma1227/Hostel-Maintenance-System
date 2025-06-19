// // const db = require('../db/connection');

// // exports.studentLogin = async (req, res) => {
// //   try {
// //     let { rollno, password } = req.body;
    
// //     // Validate input fields
// //     if (!rollno || !password) {
// //       return res.status(400).json({ error: 'Roll number and password are required' });
// //     }

// //     // Convert roll number to uppercase for consistent comparison
// //     rollno = rollno.toUpperCase();

// //     // Fetch user details by roll number
// //     const [results] = await db.query(
// //       `
// //       SELECT u.* 
// //       FROM Students s
// //       JOIN Users u ON s.user_FK = u.user_PK
// //       WHERE s.roll_number = ?
// //       `,
// //       [rollno]
// //     );

// //     // If no user found, respond with invalid credentials
// //     if (results.length === 0) {
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }

// //     const user = results[0];

// //     // Plain-text password comparison (for testing — replace with bcrypt in production)
// //     if (password !== user.password) {
// //       return res.status(401).json({ error: 'Invalid credentials' });
// //     }

// //     // Fetch student room allocation using the same uppercase roll number
// //     const [studentResults] = await db.query(
// //       `
// //       SELECT room_FK
// //       FROM Students 
// //       WHERE roll_number = ?
// //       `,
// //       [rollno]
// //     );

// //     // Return success response with user details and room allocation
// //     res.json({
// //       message: 'Login successful',
// //       user: {
// //         ...user,
// //         user_PK: user.user_PK,
// //         room_FK: studentResults[0]?.room_FK || null,
// //       },
// //     });
// //   } catch (err) {
// //     console.error('Login error:', err);
// //     res.status(500).json({ error: 'Database error', detail: err.message });
// //   }
// // };



// const db = require('../db/connection');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// exports.studentLogin = async (req, res) => {
//   try {
//     let { rollno, password } = req.body;
//     console.log('Login attempt with rollno:', rollno);
//     console.log('Login attempt with password:', password);

//     if (!rollno || !password) {
//       return res.status(400).json({ error: 'Roll number and password are required' });
//     }

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
//     console.log('Query results:', results);
//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = results[0];

//     // Plain-text password comparison (replace with bcrypt in production)
//     if (password !== user.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Fetch student's room allocation
//     const [studentResults] = await db.query(
//       `
//       SELECT room_FK
//       FROM Students 
//       WHERE roll_number = ?
//       `,
//       [rollno]
//     );

//     const room_FK = studentResults[0]?.room_FK || null;

//     // JWT payload with only user_PK, room_FK, roll_number
//     const tokenPayload = {
//       user_PK: user.user_PK,
//       room_FK,
//       roll_number: rollno,
//     };

//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRY || '1h',
//     });

//     // Send response with token only
//     res.status(200).json({
//       message: 'Login successful',
//       token,
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// };

// exports.adminLogin = async (req, res) => {
//   try {
//     let { rollno, password } = req.body; // rollno is actually user_FK for admins
//     console.log('Admin login attempt with ID:', rollno);
//     console.log('Password:', password);

//     if (!rollno || !password) {
//       return res.status(400).json({ error: 'Admin ID and password are required' });
//     }

//     // Convert to uppercase for consistency (optional)
//     rollno = rollno.toUpperCase();

//     // Fetch user details from Users table using user_FK from Admins
//     const [results] = await db.query(
//       `
//       SELECT u.*
//       FROM Admins a
//       JOIN Users u ON a.user_FK = u.user_PK
//       WHERE a.user_FK = ?
//       `,
//       [rollno]
//     );

//     console.log('Query results:', results);

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = results[0];

//     // Plain-text password check (use bcrypt in production)
//     if (password !== user.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Create JWT payload with only user_PK
//     const tokenPayload = {
//       user_PK: user.user_PK,
//     };

//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRY || '1h',
//     });

//     res.status(200).json({
//       message: 'Admin login successful',
//       token,
//     });
//   } catch (err) {
//     console.error('Admin login error:', err);
//     res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// };



const db = require('../db/connection');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// // ---------------- Student Login ----------------
// const studentLogin = async (req, res) => {
//   try {
//     let { rollno, password } = req.body;
//     console.log('Login attempt with rollno:', rollno);
//     console.log('Login attempt with password:', password);

//     if (!rollno || !password) {
//       return res.status(400).json({ error: 'Roll number and password are required' });
//     }

//     rollno = rollno.toUpperCase();

//     // Fetch user by roll number
//     const [results] = await db.query(
//       `
//       SELECT u.* 
//       FROM Students s
//       JOIN Users u ON s.user_FK = u.user_PK
//       WHERE s.roll_number = ?
//       `,
//       [rollno]
//     );
//     console.log('Query results:', results);

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = results[0];

//     if (password !== user.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const [studentResults] = await db.query(
//       `
//       SELECT room_FK
//       FROM Students 
//       WHERE roll_number = ?
//       `,
//       [rollno]
//     );

//     const room_FK = studentResults[0]?.room_FK || null;

//     const tokenPayload = {
//       user_PK: user.user_PK,
//       room_FK,
//       roll_number: rollno,
//     };

//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRY || '1h',
//     });

//     res.status(200).json({
//       message: 'Login successful',
//       token,
//     });
//   } catch (err) {
//     console.error('Student login error:', err);
//     res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// };

// // ---------------- Admin Login ----------------
// const adminLogin = async (req, res) => {
//   try {
//     let { rollno, password } = req.body;
//     console.log('Admin login attempt with ID:', rollno);
//     console.log('Password:', password);

//     if (!rollno || !password) {
//       return res.status(400).json({ error: 'Admin ID and password are required' });
//     }

//     rollno = rollno.toUpperCase();

//     const [results] = await db.query(
//       `
//       SELECT u.*
//       FROM Admins a
//       JOIN Users u ON a.user_FK = u.user_PK
//       WHERE a.user_FK = ?
//       `,
//       [rollno]
//     );

//     console.log('Query results:', results);

//     if (results.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const user = results[0];

//     if (password !== user.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const tokenPayload = {
//       user_PK: user.user_PK,
//     };

//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRY || '1h',
//     });

//     res.status(200).json({
//       message: 'Admin login successful',
//       token,role: user.role
//     });
//   } catch (err) {
//     console.error('Admin login error:', err);
//     res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// };

// // ---------------- Exports ----------------
// module.exports = {
//   studentLogin,
//   adminLogin,
// };

// const login = async (req, res) => {
//   try {
//     let { rollno, password } = req.body;
//     console.log('Login attempt with:', rollno);

//     if (!rollno || !password) {
//       return res.status(400).json({ error: 'Roll number and password are required' });
//     }

//     rollno = rollno.toUpperCase();

//     // Try Student login first
//     const [studentResults] = await db.query(
//       `SELECT u.*, s.room_FK 
//        FROM Students s
//        JOIN Users u ON s.user_FK = u.user_PK
//        WHERE s.roll_number = ?`,
//       [rollno]
//     );

//     if (studentResults.length > 0) {
//       const studentUser = studentResults[0];
//       if (password !== studentUser.password) {
//         return res.status(401).json({ error: 'Invalid credentials' });
//       }

//       const tokenPayload = {
//         user_PK: studentUser.user_PK,
//         room_FK: studentUser.room_FK,
//         roll_number: rollno,
//         role: studentUser.role || 'student'
//       };

//       const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRY || '1h',
//       });

//       return res.status(200).json({
//         message: 'Student login successful',
//         token,
//         role: tokenPayload.role
//       });
//     }

//     // If not student, try Admin login
//     const [adminResults] = await db.query(
//       `SELECT u.*
//        FROM Admins a
//        JOIN Users u ON a.user_FK = u.user_PK
//        WHERE a.user_FK = ?`,
//       [rollno]
//     );

//     if (adminResults.length === 0) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const adminUser = adminResults[0];
//     if (password !== adminUser.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     const tokenPayload = {
//       user_PK: adminUser.user_PK,
//       role: adminUser.role || 'admin'
//     };

//     const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRY || '1h',
//     });

//     return res.status(200).json({
//       message: 'Admin login successful',
//       token,
//       role: tokenPayload.role
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     return res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// };

// module.exports = { login };


const login = async (req, res) => {
  try {
    console.log('Received login request:', req.body);

    let { rollno, user_PK, password } = req.body;

    if (!password || (!rollno && !user_PK)) {
      return res.status(400).json({ error: 'Missing credentials' });
    }

    // === 👨‍🎓 Student login
    if (rollno) {
      rollno = rollno.toUpperCase();

      const [studentResults] = await db.query(
        `SELECT u.*, s.room_FK 
         FROM Students s
         JOIN Users u ON s.user_FK = u.user_PK
         WHERE s.roll_number = ?`,
        [rollno]
      );

      if (studentResults.length === 0 || studentResults[0].password !== password) {
        return res.status(401).json({ error: 'Invalid student credentials' });
      }

      const studentUser = studentResults[0];
      const token = jwt.sign(
        {
          user_PK: studentUser.user_PK,
          room_FK: studentUser.room_FK,
          roll_number: rollno,
          role: studentUser.role || 'Student',
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || '1h' }
      );

      return res.status(200).json({
        message: 'Student login successful',
        token,
        role: 'Student',
      });
    }

    if (user_PK) {
  const [userResults] = await db.query(
    `SELECT * FROM Users WHERE user_PK = ?`,
    [user_PK]
  );
  console.log('User results:', userResults);

  if (userResults.length === 0 || userResults[0].password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const user = userResults[0];

  // Role should be stored in the Users table as either "Admin" or "Engineer"
  const role = user.role ? user.role.toLowerCase() : null;

  console.log('User role:', role);
  console.log(role !== "engineer")
  console.log(role !== "admin" && role !== "engineer")

  if (role !== "admin" && role !== "engineer") {
    return res.status(403).json({ error: "Unauthorized role" });
  }

  const token = jwt.sign(
    {
      user_PK: user.user_PK,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY || "1h" }
  );

  return res.status(200).json({
    message: `${role} login successful`,
    token,
    role,
  });
}


  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};
module.exports = { login };