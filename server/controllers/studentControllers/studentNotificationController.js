const db = require('../../db/connection');

// Fetch notifications for a user
const getNotifications = async (req, res) => {
  try {
    const userId = req.params.user_PK;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const [results] = await db.query(
      `SELECT * FROM Notifications WHERE user_FK = ? ORDER BY created_at DESC`,
      [userId]
    );

    res.json(results);
  } catch (err) {
    console.error('Notification fetch error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
};

// Mark a notification as read
const markAsRead = async (req, res) => {
  try {
    const notificationId = req.params.notification_PK;

    const [update] = await db.query(
      `UPDATE Notifications SET read_status = TRUE, updated_at = NOW() WHERE notification_PK = ?`,
      [notificationId]
    );

    if (update.affectedRows === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Notification update error:', err);
    res.status(500).json({ error: 'Database error', detail: err.message });
  }
};

// Mark all notifications as read for a user
const markAllAsRead = async (req, res) => {
  const user_PK = req.params.user_PK;


  try {
    await db.execute(
      `UPDATE Notifications SET read_status = true WHERE user_FK = ?`,
      [user_PK]
    );

    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    console.error('Mark all as read error:', err);
    res.status(500).json({ error: 'Server error marking all notifications as read' });
  }
};

// Export everything cleanly at the end
module.exports = {
  getNotifications,
  markAsRead,
  markAllAsRead,
};
