import React, { useRef, useEffect } from "react";
import {
  FaCheckDouble,
  FaCheck,
  FaRegCircle,
  FaBell,
  FaClock,
} from "react-icons/fa";
import "../../styles/NotificationsPanel.css";

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
        !event.target.closest(".studentdashboard-notification-panel-btn")
      ) {
        document
          .querySelector(".studentdashboard-notification-panel-btn")
          ?.click();
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
    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return "Just now";
  };

  const unreadCount = notifications.filter((n) => !n.read_status).length;
  const totalCount = notifications.filter((n) => !n.read_status).length;

  return (
    <div
      className="studentdashboard-notification-panel-container"
      ref={panelRef}
    >
      <div className="studentdashboard-notification-panel-header">
        <div className="studentdashboard-notification-panel-counter">
          <h3>Notifications</h3>
          <span className="studentdashboard-notification-panel-count-indicator">
            {unreadCount} unread / {totalCount} total
          </span>
        </div>
        {unreadCount > 0 && (
          <button
            className="studentdashboard-notification-panel-mark-all-read"
            onClick={markAllNotificationsAsRead}
          >
            <FaCheckDouble className="studentdashboard-notification-panel-mark-read-icon" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="studentdashboard-notification-panel-list">
        {notifications.length === 0 ? (
          <div className="studentdashboard-notification-panel-empty">
            <div className="studentdashboard-notification-panel-empty-icon">
              <FaBell />
            </div>
            <p>No notifications yet</p>
            <span className="studentdashboard-notification-panel-empty-subtitle">
              We'll notify you when something important happens
            </span>
          </div>
        ) : (
          notifications
          .filter((notification) => !notification.read_status)
          .map((notification) => (
            <div
              key={notification.notification_PK}
              className={`studentdashboard-notification-panel-item ${
                notification.read_status
                  ? "studentdashboard-notification-panel-read"
                  : "studentdashboard-notification-panel-unread"
              }`}
              onClick={() =>
                markNotificationAsRead(notification.notification_PK)
              }
            >
              <div className="studentdashboard-notification-panel-status-icon">
                {notification.read_status ? (
                  <FaCheck className="studentdashboard-notification-panel-read-icon" />
                ) : (
                  <FaRegCircle className="studentdashboard-notification-panel-unread-icon" />
                )}
              </div>
              <div className="studentdashboard-notification-panel-content">
                <p className="studentdashboard-notification-panel-message">
                  {notification.message}
                </p>
                <div className="studentdashboard-notification-panel-footer">
                  <span className="studentdashboard-notification-panel-time">
                    <FaClock className="studentdashboard-notification-panel-time-icon" />
                    {getTimeElapsed(notification.created_at)}
                  </span>
                </div>
              </div>
              {!notification.read_status && (
                <span className="studentdashboard-notification-panel-badge"></span>
              )}
            </div>
          ))
        )}
      </div>
      <div className="studentdashboard-notification-panel-footer">
        <p className="studentdashboard-notification-panel-tip">
          Click on a notification to mark it as read
        </p>
      </div>
    </div>
  );
};

export default NotificationsPanel;
