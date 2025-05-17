import React from "react";

const NotificationsPanel = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}) => {
  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h3>Notifications</h3>
        {notifications.some((n) => !n.read) && (
          <button className="mark-all-read" onClick={onMarkAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${
                notification.read ? "" : "unread"
              }`}
              onClick={() => onMarkAsRead(notification.id)}
            >
              <div className="notification-content">{notification.message}</div>
              <span className="notification-time">{notification.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPanel;
