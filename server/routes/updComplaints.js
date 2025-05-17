const express = require("express");
const router = express.Router();
const db = require("../db/connection"); // already promise-based

router.put("/update", async (req, res) => {
  const { id, status, description } = req.body;

  if (!id || !status || !description) {
    return res.status(400).json({ error: "id, status, and description are required" });
  }

  try {
    const [result] = await db.query(`
      UPDATE Complaints
      SET status = ?, description = ?, updated_at = NOW()
      WHERE id = ?
    `, [status, description, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Complaint not found or already up to date" });
    }

    res.json({ message: "Complaint updated successfully" });
  } catch (err) {
    console.error("Update complaint error:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

module.exports = router;
