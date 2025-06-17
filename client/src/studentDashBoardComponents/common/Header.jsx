import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaUserCircle, FaQuestionCircle } from "react-icons/fa";
import NotificationsPanel from "./NotificationsPanel";
import ProfileDropdown from "./ProfileDropdown";




const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile]       = useState(false);
  
  const [notifications, setNotifications] = useState([]);


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


  

const fetchNotifications = async () => {
    try {
      // const rollNumber = localStorage.getItem("roll_number");
      const user_PK = localStorage.getItem("user_PK");

      const res = await fetch(`http://localhost:4000/api/notifications/${user_PK}`);

      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };
const markAllNotificationsAsRead = async () => {
   try {
      // const rollNumber = localStorage.getItem("roll_number");
      const user_PK = localStorage.getItem("user_PK");
      const res = await fetch(`http://localhost:4000/api/notifications/markAllAsRead/${user_PK}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to mark all as read");

      // Update local state
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, read_status: true }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
};
const markNotificationAsRead = async (notification_PK) => {
  try {
      const res = await fetch(`http://localhost:4000/api/notifications/markAsRead/${notification_PK}`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Failed to mark as read");

      // Update local state
      setNotifications((prev) =>
        prev.map((n) =>
          n.notification_PK === notification_PK ? { ...n, read_status: true } : n
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
};
useEffect(() => {
  fetchNotifications();

  const handleUpdate = () => {
    fetchNotifications();
  };

  window.addEventListener("notificationsUpdated", handleUpdate);

  return () => {
    window.removeEventListener("notificationsUpdated", handleUpdate);
  };
}, []);
const unreadCount = notifications.filter((n) => !n.read_status).length;


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
