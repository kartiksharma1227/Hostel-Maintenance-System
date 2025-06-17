// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import NotificationsPanel from "./NotificationsPanel";

// const NotificationsWrapper = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [showPanel, setShowPanel] = useState(false);

//   // Function to fetch notifications from backend API
//   const fetchNotifications = async () => {
//     try {
//       const response = await axios.get("/api/notifications"); // change to your API endpoint
//       setNotifications(response.data.notifications);
//     } catch (error) {
//       console.error("Failed to fetch notifications", error);
//     }
//   };

//   // Fetch notifications once on mount
//   useEffect(() => {
//     fetchNotifications();

//     // Optional: poll every 30 seconds to get new notifications
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   // Mark all notifications as read
//   const markAllNotificationsAsRead = async () => {
//     try {
//       await axios.post("/api/notifications/markAllRead"); // your API for marking all read
//       setNotifications((prev) =>
//         prev.map((n) => ({ ...n, read_status: true }))
//       );
//     } catch (error) {
//       console.error("Failed to mark all as read", error);
//     }
//   };

//   // Mark a single notification as read
//   const markNotificationAsRead = async (id) => {
//     try {
//       await axios.post(`/api/notifications/${id}/markRead`); // your API to mark one read
//       setNotifications((prev) =>
//         prev.map((n) =>
//           n.notification_PK === id ? { ...n, read_status: true } : n
//         )
//       );
//     } catch (error) {
//       console.error("Failed to mark notification as read", error);
//     }
//   };

//   return (
//     <div>
//       <button
//         className="notification-btn"
//         onClick={() => setShowPanel((v) => !v)}
//       >
//         Notifications ({notifications.filter((n) => !n.read_status).length})
//       </button>

//       <NotificationsPanel
//         notifications={notifications}
//         visible={showPanel}
//         markAllNotificationsAsRead={markAllNotificationsAsRead}
//         markNotificationAsRead={markNotificationAsRead}
//       />
//     </div>
//   );
// };

// export default NotificationsWrapper;



// import React from "react";
// import NotificationsPanel from "./NotificationsPanel";

// const NotificationsWrapper = ({
//   notifications,
//   visible,
//   markAllAsRead,
//   markAsRead,
//   togglePanel
// }) => {
//   return (
//     <div>
//       <button className="notification-btn" onClick={togglePanel}>
//         Notifications ({notifications.filter((n) => !n.read_status).length})
//       </button>

//       <NotificationsPanel
//         notifications={notifications}
//         visible={visible}
//         markAllNotificationsAsRead={markAllAsRead}
//         markNotificationAsRead={markAsRead}
//       />
//     </div>
//   );
// };

// export default NotificationsWrapper;

import React, { useEffect, useState } from "react";
import NotificationsPanel from "./NotificationsPanel";

const NotificationsWrapper = () => {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);

  // Fetch notifications from backend
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

  // Toggle notification panel visibility
  const togglePanel = () => {
    setVisible((prev) => !prev);
  };

  // Mark all as read
  const markAllAsRead = async () => {
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

  // Mark a single notification as read
  const markAsRead = async (notification_PK) => {
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

  // Load notifications on mount
  useEffect(() => {
    fetchNotifications();

    // Listen for custom event to refresh on new complaint
    const handleUpdate = () => {
      fetchNotifications();
    };
    window.addEventListener("notificationsUpdated", handleUpdate);

    return () => {
      window.removeEventListener("notificationsUpdated", handleUpdate);
    };
  }, []);

  return (
    <div>
      <button className="notification-btn" onClick={togglePanel}>
        Notifications ({notifications.filter((n) => !n.read_status).length})
      </button>

      <NotificationsPanel
        notifications={notifications}
        visible={visible}
        markAllNotificationsAsRead={markAllAsRead}
        markNotificationAsRead={markAsRead}
      />
    </div>
  );
};

export default NotificationsWrapper;
