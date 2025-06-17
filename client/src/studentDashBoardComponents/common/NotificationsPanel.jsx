import React, { useRef, useEffect } from "react";
import { FaCheckDouble, FaCheck, FaRegCircle, FaBell } from "react-icons/fa";

const NotificationsPanel = ({
  notifications,
  visible,
  markAllNotificationsAsRead,
  markNotificationAsRead,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest(".notification-btn")
      ) {
        document.querySelector(".notification-btn")?.click();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible]);

  if (!visible) return null;

  const getTimeElapsed = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = now.getTime() - past.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return "Just now";
  };

  const unreadCount = notifications.filter((n) => !n.read_status).length;
  const totalCount = notifications.length;

  return (
    <div className="notifications-panel" ref={panelRef}>
      <div className="notifications-header">
        <div className="notification-counter">
          <h3>Notifications</h3>
          <span className="notification-count-indicator">
            {unreadCount} unread / {totalCount} total
          </span>
        </div>
        {unreadCount > 0 && (
          <button className="mark-all-read" onClick={markAllNotificationsAsRead}>
            <FaCheckDouble className="mark-read-icon" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <div className="empty-notifications-icon">
              <FaBell />
            </div>
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.notification_PK}
              className={`notification-item ${
                notification.read_status ? "read" : "unread"
              }`}
              onClick={() => {console.log("Clicked notification:", notification.notification_PK);markNotificationAsRead(notification.notification_PK)}}
            >
              <div className="read-status-icon">
                {notification.read_status ? (
                  <FaCheck className="read-icon" />
                ) : (
                  <FaRegCircle className="unread-icon" />
                )}
              </div>
              <div className="notification-content">
                <p>{notification.message}</p>
                <span className="notification-time">
                  {getTimeElapsed(notification.date)}
                </span>
              </div>
              {!notification.read_status && <span className="unread-indicator"></span>}
            </div>
          ))
        )}
      </div>

      <div className="notifications-footer">
        <p className="notification-tip">Click on a notification to mark it as read</p>
      </div>
    </div>
  );
};

export default NotificationsPanel;
