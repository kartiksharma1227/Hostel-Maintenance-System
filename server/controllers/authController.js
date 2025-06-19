
const db = require('../db/connection');
const jwt = require('jsonwebtoken');

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

    // === 👨‍💻 Admin or Engineer login
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

      // ✅ Normalize role safely
      const rawRole = user.role;
      const normalizedRole = rawRole ? rawRole.toLowerCase() : null;

      console.log('User role:', normalizedRole);

      if (normalizedRole !== "admin" && normalizedRole !== "engineer") {
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
        message: `${normalizedRole} login successful`,
        token,
        role: normalizedRole,
      });
    }

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error", detail: err.message });
  }
};

module.exports = {
  login,
};
