// src/EngineerDashBoardComponents/NotificationPanel.jsx
const NotificationPanel = ({ notifications, markAllNotificationsAsRead, markNotificationAsRead }) => {
  return (
    <div className="engineer-notifications-panel">
      <div className="engineer-notifications-header">
        <h3>Notifications</h3>
        <button className="engineer-mark-all-read" onClick={markAllNotificationsAsRead}>
          Mark all as read
        </button>
      </div>
      <div className="engineer-notifications-list">
        {notifications.length === 0 ? (
          <div className="engineer-no-notifications">
            <span className="engineer-empty-notifications-icon">🔔</span>
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`engineer-notification-item ${notification.read ? "read" : "unread"}`}
              onClick={() => markNotificationAsRead(notification.id)}
            >
              <div className="engineer-notification-content">
                <p>{notification.message}</p>
                <span className="engineer-notification-time">{notification.time}</span>
              </div>
              {!notification.read && <span className="engineer-unread-indicator"></span>}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
