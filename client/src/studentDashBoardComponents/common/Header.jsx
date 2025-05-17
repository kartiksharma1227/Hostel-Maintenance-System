import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import NotificationsPanel from "./NotificationsPanel";
import ProfileDropdown from "./ProfileDropdown";

const mockNotifications = [ /* …your existing mock data… */ ];

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile]       = useState(false);
  const [notifications, setNotifications]   = useState(mockNotifications);

  // ← Add this state to hold the fetched name
  const [studentName, setStudentName] = useState("");

  // ← Fetch just once, on mount
  useEffect(() => {
    const userPk = localStorage.getItem("user_PK");
    if (!userPk) return;

    axios
      .get(`/api/student/profile/${userPk}`)
      .then(res => {
        // res.data.profile is your object from the backend
        setStudentName(res.data.profile.name);
      })
      .catch(err => {
        console.error("Could not load student name:", err);
      });
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markNotificationAsRead = id => {
    setNotifications(
      notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <header className="dashboard-header enhanced">
      <div className="logo">
        <h1>Maintenance Portal</h1>
      </div>

      <div className="header-controls">
        <button className="help-btn">
          <FaQuestionCircle />
        </button>

        <button
          className="notification-btn enhanced"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <FaBell />
          {unreadCount > 0 && (
            <span className="notification-badge pulse">{unreadCount}</span>
          )}
        </button>

        <div
          className="user-profile enhanced"
          onClick={() => setShowProfile(!showProfile)}
        >
          <div className="avatar-container">
            <FaUserCircle className="avatar" />
            <span className="online-indicator"></span>
          </div>
          {/* ← Render the fetched name or a placeholder while loading */}
          <span className="user-name">
            {studentName || "Loading…"}
          </span>
        </div>

        <NotificationsPanel
          notifications={notifications}
          visible={showNotifications}
          markAllNotificationsAsRead={markAllNotificationsAsRead}
          markNotificationAsRead={markNotificationAsRead}
        />

        {showProfile && (
          // You can still let ProfileDropdown fetch its own data,
          // or pass studentName/profile down as a prop if you refactor it.
          <ProfileDropdown onClose={() => setShowProfile(false)} />
        )}
      </div>
    </header>
  );
};

export default Header;
