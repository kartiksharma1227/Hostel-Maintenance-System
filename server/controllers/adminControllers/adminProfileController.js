const db = require('../../db/connection');


// GET /api/admin/profile/:userPK
const getAdminProfile = async (req, res) => {
  const { userPK } = req.params;

  try {
    const [rows] = await db.execute(
      `SELECT u.name, u.mail_UN AS email, a.phone_number
       FROM Users u
       JOIN Admin a ON u.user_PK = a.user_FK
       WHERE u.user_PK = ?`,
      [userPK]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const admin = rows[0];
    res.json({
      profile: {
        name: admin.name,
        email: admin.email,
        phone: admin.phone_number,
        role: "Administrator",
      },
    });
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAdminProfile };
