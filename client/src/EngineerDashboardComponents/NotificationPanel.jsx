import React, { useRef, useEffect } from "react";
import { FaCheckDouble, FaCheck, FaRegCircle, FaBell } from "react-icons/fa";
import "../styles/EngineerNotificationPanel.css";

const NotificationsPanel = ({
  notifications,
  visible,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  closePanel,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        !event.target.closest(".engineerdashboard-notification-pannel-btn")
      ) {
        closePanel(); // ✅ Use explicit close
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, closePanel]);

  if (!visible) return null;

  const getTimeElapsed = (dateString) => {
    if (!dateString) return "Unknown time";
    const now = new Date();
    const past = new Date(dateString);
    if (isNaN(past.getTime())) return "Invalid date";
    const diff = now.getTime() - past.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return "Just now";
  };

  const unreadCount = notifications.filter((n) => !n.read_status).length;
  const totalCount = notifications.filter((n) => !n.read_status).length;

  return (
    <div
      className="engineerdashboard-notification-pannel-container"
      ref={panelRef}
    >
      <div className="engineerdashboard-notification-pannel-header">
        <div className="engineerdashboard-notification-pannel-counter">
          <h3>Notifications</h3>
          <span className="engineerdashboard-notification-pannel-count-indicator">
            {unreadCount} unread / {totalCount} total
          </span>
        </div>
        {unreadCount > 0 && (
          <button
            className="engineerdashboard-notification-pannel-mark-all-read"
            onClick={markAllNotificationsAsRead}
          >
            <FaCheckDouble className="engineerdashboard-notification-pannel-mark-read-icon" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="engineerdashboard-notification-pannel-list">
        {notifications.length === 0 ? (
          <div className="engineerdashboard-notification-pannel-no-notifications">
            <div className="engineerdashboard-notification-pannel-empty-icon">
              <FaBell />
            </div>
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications
          .filter((notification) => !notification.read_status)
          .map((notification) => (
            <div
              key={notification.notification_PK}
              className={`engineerdashboard-notification-pannel-item ${
                notification.read_status ? "read" : "unread"
              }`}
              onClick={() => {
                console.log(
                  "Clicked notification:",
                  notification.notification_PK
                );
                markNotificationAsRead(notification.notification_PK);
              }}
            >
              <div className="engineerdashboard-notification-pannel-read-status-icon">
                {notification.read_status ? (
                  <FaCheck className="engineerdashboard-notification-pannel-read-icon" />
                ) : (
                  <FaRegCircle className="engineerdashboard-notification-pannel-unread-icon" />
                )}
              </div>
              <div className="engineerdashboard-notification-pannel-content">
                <p>{notification.message}</p>
                <span className="engineerdashboard-notification-pannel-time">
                  {getTimeElapsed(notification.created_at)}
                </span>
              </div>
              {!notification.read_status && (
                <span className="engineerdashboard-notification-pannel-unread-indicator"></span>
              )}
            </div>
          ))
        )}
      </div>

      <div className="engineerdashboard-notification-pannel-footer">
        <p className="engineerdashboard-notification-pannel-tip">
          Click on a notification to mark it as read
        </p>
      </div>
    </div>
  );
};

export default NotificationsPanel;
