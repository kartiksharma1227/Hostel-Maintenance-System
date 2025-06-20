// controllers/feedbackController.js
const db = require("../db/connection"); // Adjust the path to your database module

async function submitFeedback(req, res) {
  const { complaintId, rating, text } = req.body;
  if (!complaintId || rating == null || text == null) {
    return res.status(400).json({ message: 'Missing fields' });
  }
  try {
    await db.query(
      `INSERT INTO Feedback (complaint_FK, rating, text, created_at)
       VALUES (?, ?, ?, NOW())`,
      [complaintId, rating, text]
    );
    // Optionally mark complaint as “rated” or similar
    res.json({ message: 'Feedback saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getFeedback(req, res) {
  const { complaintId } = req.query;
  try {
    const [rows] = await db.execute(
      `SELECT rating, text, created_at FROM Feedback WHERE complaint_FK = ?`,
      [complaintId]
    );
    res.json(rows[0] || null);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { submitFeedback, getFeedback };
