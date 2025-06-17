// // File: Server/routes/authLogin.js

// const express = require('express');
// const router = express.Router();
// const db = require('../db/connection');

// // POST /api/student/login
// router.post('/student/login', async (req, res) => {
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

//     // Plain-text password comparison
//     const user = results[0];
//     if (password !== user.password) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Send the user's data, including primary key (user_PK)
//     res.json({
//       message: 'Login successful',
//       // user: { ...user, roll_number: rollno },
//       user: { ...user, user_PK: user.user_PK ,room_FK: studentResults[0]?.room_FK },

//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ error: 'Database error', detail: err.message });
//   }
// });

// module.exports = router;




// File: Server/routes/authLogin.js

const express = require('express');
const router = express.Router();
const { studentLogin } = require('../controllers/authController.js');

// POST /api/student/login
router.post('/student/login', studentLogin);

module.exports = router;
