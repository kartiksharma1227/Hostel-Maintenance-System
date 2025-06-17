// // import React, { useRef, useEffect } from "react";
// // import { FaBell, FaCheckDouble, FaCheck, FaRegCircle } from "react-icons/fa";

// // const NotificationsPanel = ({
// //   notifications,
// //   visible,
// //   markAllNotificationsAsRead,
// //   markNotificationAsRead,
// // }) => {
// //   const panelRef = useRef(null);

// //   // Close panel when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         panelRef.current &&
// //         !panelRef.current.contains(event.target) &&
// //         !event.target.closest(".notification-btn")
// //       ) {
// //         // Find and click the notification button to close the panel
// //         const notificationBtn = document.querySelector(".notification-btn");
// //         if (notificationBtn && visible) {
// //           notificationBtn.click();
// //         }
// //       }
// //     };

// //     if (visible) {
// //       document.addEventListener("mousedown", handleClickOutside);
// //     }

// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [visible]);

// //   if (!visible) return null;

// //   // Format time to relative format (e.g., "2 hours ago")
// //   const getTimeElapsed = (dateString) => {
// //     const now = new Date();
// //     const past = new Date(dateString);
// //     const diff = now.getTime() - past.getTime();

// //     const minutes = Math.floor(diff / 60000);
// //     const hours = Math.floor(minutes / 60);
// //     const days = Math.floor(hours / 24);

// //     if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
// //     if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
// //     if (minutes > 0)
// //       return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
// //     return "Just now";
// //   };

// //   const unreadCount = notifications.filter((n) => !n.read).length;
// //   const totalCount = notifications.length;

// //   return (
// //     <div className="notifications-panel" ref={panelRef}>
// //       <div className="notifications-header">
// //         <div className="notification-counter">
// //           <h3>Notifications</h3>
// //           <span className="notification-count-indicator">
// //             {unreadCount} unread / {totalCount} total
// //           </span>
// //         </div>
// //         {notifications.some((n) => !n.read) && (
// //           <button
// //             className="mark-all-read"
// //             onClick={markAllNotificationsAsRead}
// //           >
// //             <FaCheckDouble className="mark-read-icon" />
// //             Mark all as read
// //           </button>
// //         )}
// //       </div>

// //       <div className="notifications-list">
// //         {notifications.length === 0 ? (
// //           <div className="no-notifications">
// //             <div className="empty-notifications-icon">
// //               <FaBell />
// //             </div>
// //             <p>No notifications yet</p>
// //           </div>
// //         ) : (
// //           notifications.map((notification) => (
// //             <div
// //               key={notification.id}
// //               className={`notification-item ${
// //                 notification.read ? "read" : "unread"
// //               }`}
// //               onClick={() => markNotificationAsRead(notification.id)}
// //             >
// //               <div className="read-status-icon">
// //                 {notification.read ? (
// //                   <FaCheck className="read-icon" />
// //                 ) : (
// //                   <FaRegCircle className="unread-icon" />
// //                 )}
// //               </div>
// //               <div className="notification-content">
// //                 <h4 className="notification-title">{notification.title}</h4>
// //                 <p>{notification.message}</p>
// //                 <span className="notification-time">
// //                   {getTimeElapsed(notification.time)}
// //                 </span>
// //               </div>
// //               {!notification.read && <span className="unread-indicator"></span>}
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       <div className="notifications-footer">
// //         <p className="notification-tip">
// //           Click on a notification to mark it as read
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotificationsPanel;


// // import React, { useRef, useEffect } from "react";
// // import { FaBell, FaCheckDouble, FaCheck, FaRegCircle } from "react-icons/fa";

// // const NotificationsPanel = ({
// //   notifications,
// //   visible,
// //   markAllNotificationsAsRead,
// //   markNotificationAsRead,
// // }) => {
// //   const panelRef = useRef(null);

// //   // Close panel when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         panelRef.current &&
// //         !panelRef.current.contains(event.target) &&
// //         !event.target.closest(".notification-btn")
// //       ) {
// //         const notificationBtn = document.querySelector(".notification-btn");
// //         if (notificationBtn && visible) {
// //           notificationBtn.click();
// //         }
// //       }
// //     };

// //     if (visible) {
// //       document.addEventListener("mousedown", handleClickOutside);
// //     }
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [visible]);

// //   if (!visible) return null;

// //   // Format time to relative format
// //   const getTimeElapsed = (dateString) => {
// //     const now = new Date();
// //     const past = new Date(dateString);
// //     const diff = now.getTime() - past.getTime();

// //     const minutes = Math.floor(diff / 60000);
// //     const hours = Math.floor(minutes / 60);
// //     const days = Math.floor(hours / 24);

// //     if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
// //     if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
// //     if (minutes > 0)
// //       return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
// //     return "Just now";
// //   };

// //   const unreadCount = notifications.filter((n) => !n.read_status).length;
// //   const totalCount = notifications.length;

// //   return (
// //     <div className="notifications-panel" ref={panelRef}>
// //       <div className="notifications-header">
// //         <div className="notification-counter">
// //           <h3>Notifications</h3>
// //           <span className="notification-count-indicator">
// //             {unreadCount} unread / {totalCount} total
// //           </span>
// //         </div>
// //         {notifications.some((n) => !n.read_status) && (
// //           <button
// //             className="mark-all-read"
// //             onClick={markAllNotificationsAsRead}
// //           >
// //             <FaCheckDouble className="mark-read-icon" />
// //             Mark all as read
// //           </button>
// //         )}
// //       </div>

// //       <div className="notifications-list">
// //         {notifications.length === 0 ? (
// //           <div className="no-notifications">
// //             <div className="empty-notifications-icon">
// //               <FaBell />
// //             </div>
// //             <p>No notifications yet</p>
// //           </div>
// //         ) : (
// //           notifications.map((notification) => (
// //             <div
// //               key={notification.notification_PK}
// //               className={`notification-item ${
// //                 notification.read_status ? "read" : "unread"
// //               }`}
// //               onClick={() =>
// //                 markNotificationAsRead(notification.notification_PK)
// //               }
// //             >
// //               <div className="read-status-icon">
// //                 {notification.read_status ? (
// //                   <FaCheck className="read-icon" />
// //                 ) : (
// //                   <FaRegCircle className="unread-icon" />
// //                 )}
// //               </div>
// //               <div className="notification-content">
// //                 <p>{notification.message}</p>
// //                 <span className="notification-time">
// //                   {getTimeElapsed(notification.created_at)}
// //                 </span>
// //               </div>
// //               {!notification.read_status && (
// //                 <span className="unread-indicator"></span>
// //               )}
// //             </div>
// //           ))
// //         )}
// //       </div>

// //       <div className="notifications-footer">
// //         <p className="notification-tip">
// //           Click on a notification to mark it as read
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotificationsPanel;
// // import React, { useRef, useEffect, useState } from "react";
// // import {
// //   FaBell,
// //   FaCheckDouble,
// //   FaCheck,
// //   FaRegCircle,
// // } from "react-icons/fa";

// // const NotificationsPanel = () => {
// //   const [notifications, setNotifications] = useState([]);
// //   const [visible, setVisible] = useState(false);
// //   const panelRef = useRef(null);

// //   // Fetch notifications from backend
// //   const fetchNotifications = async () => {
// //     try {
// //       const user_PK = localStorage.getItem("user_PK");
// //       const res = await fetch(`http://localhost:4000/api/notifications/${user_PK}`);
// //       if (!res.ok) throw new Error("Failed to fetch notifications");
// //       const data = await res.json();
// //       setNotifications(data);
// //     } catch (err) {
// //       console.error("Error fetching notifications:", err);
// //     }
// //   };

// //   // Toggle notification panel visibility
// //   const togglePanel = () => {
// //     setVisible((prev) => !prev);
// //   };

// //   // Mark all as read
// //   const markAllAsRead = async () => {
// //     try {
// //       const user_PK = localStorage.getItem("user_PK");
// //       const res = await fetch(`http://localhost:4000/api/notifications/markAllAsRead/${user_PK}`, {
// //         method: "PUT",
// //       });
// //       if (!res.ok) throw new Error("Failed to mark all as read");

// //       setNotifications((prev) =>
// //         prev.map((n) => ({ ...n, read_status: true }))
// //       );
// //     } catch (err) {
// //       console.error("Error marking all notifications as read:", err);
// //     }
// //   };

// //   // Mark a single notification as read
// //   const markAsRead = async (notification_PK) => {
// //     try {
// //       const res = await fetch(`http://localhost:4000/api/notifications/markAsRead/${notification_PK}`, {
// //         method: "PUT",
// //       });
// //       if (!res.ok) throw new Error("Failed to mark as read");

// //       setNotifications((prev) =>
// //         prev.map((n) =>
// //           n.notification_PK === notification_PK
// //             ? { ...n, read_status: true }
// //             : n
// //         )
// //       );
// //     } catch (err) {
// //       console.error("Error marking notification as read:", err);
// //     }
// //   };

// //   // Load notifications on mount + listen for update event
// //   useEffect(() => {
// //     fetchNotifications();

// //     const handleUpdate = () => {
// //       fetchNotifications();
// //     };
// //     window.addEventListener("notificationsUpdated", handleUpdate);

// //     return () => {
// //       window.removeEventListener("notificationsUpdated", handleUpdate);
// //     };
// //   }, []);

// //   // Close panel when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (
// //         panelRef.current &&
// //         !panelRef.current.contains(event.target) &&
// //         !event.target.closest(".notification-btn")
// //       ) {
// //         const notificationBtn = document.querySelector(".notification-btn");
// //         if (notificationBtn && visible) {
// //           notificationBtn.click();
// //         }
// //       }
// //     };

// //     if (visible) {
// //       document.addEventListener("mousedown", handleClickOutside);
// //     }
// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside);
// //     };
// //   }, [visible]);

// //   // Format time to relative format
// //   const getTimeElapsed = (dateString) => {
// //     const now = new Date();
// //     const past = new Date(dateString);
// //     const diff = now.getTime() - past.getTime();

// //     const minutes = Math.floor(diff / 60000);
// //     const hours = Math.floor(minutes / 60);
// //     const days = Math.floor(hours / 24);

// //     if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
// //     if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
// //     if (minutes > 0)
// //       return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
// //     return "Just now";
// //   };

// //   const unreadCount = notifications.filter((n) => !n.read_status).length;
// //   const totalCount = notifications.length;

// //   return (
// //     <div>
// //       <button className="notification-btn" onClick={togglePanel}>
// //         Notifications ({unreadCount})
// //       </button>

// //       {visible && (
// //         <div className="notifications-panel" ref={panelRef}>
// //           <div className="notifications-header">
// //             <div className="notification-counter">
// //               <h3>Notifications</h3>
// //               <span className="notification-count-indicator">
// //                 {unreadCount} unread / {totalCount} total
// //               </span>
// //             </div>
// //             {unreadCount > 0 && (
// //               <button
// //                 className="mark-all-read"
// //                 onClick={markAllAsRead}
// //               >
// //                 <FaCheckDouble className="mark-read-icon" />
// //                 Mark all as read
// //               </button>
// //             )}
// //           </div>

// //           <div className="notifications-list">
// //             {notifications.length === 0 ? (
// //               <div className="no-notifications">
// //                 <div className="empty-notifications-icon">
// //                   <FaBell />
// //                 </div>
// //                 <p>No notifications yet</p>
// //               </div>
// //             ) : (
// //               notifications.map((notification) => (
// //                 <div
// //                   key={notification.notification_PK}
// //                   className={`notification-item ${
// //                     notification.read_status ? "read" : "unread"
// //                   }`}
// //                   onClick={() =>
// //                     markAsRead(notification.notification_PK)
// //                   }
// //                 >
// //                   <div className="read-status-icon">
// //                     {notification.read_status ? (
// //                       <FaCheck className="read-icon" />
// //                     ) : (
// //                       <FaRegCircle className="unread-icon" />
// //                     )}
// //                   </div>
// //                   <div className="notification-content">
// //                     <p>{notification.message}</p>
// //                     <span className="notification-time">
// //                       {getTimeElapsed(notification.created_at)}
// //                     </span>
// //                   </div>
// //                   {!notification.read_status && (
// //                     <span className="unread-indicator"></span>
// //                   )}
// //                 </div>
// //               ))
// //             )}
// //           </div>

// //           <div className="notifications-footer">
// //             <p className="notification-tip">
// //               Click on a notification to mark it as read
// //             </p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default NotificationsPanel;


// import React, { useRef, useEffect } from "react";
// import { FaCheckDouble, FaCheck, FaRegCircle, FaBell } from "react-icons/fa";

// const NotificationsPanel = ({
//   notifications,
//   visible,
//   markAllNotificationsAsRead,
//   markNotificationAsRead,
// }) => {
//   const panelRef = useRef(null);

//   // Close panel when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         panelRef.current &&
//         !panelRef.current.contains(event.target) &&
//         !event.target.closest(".notification-btn")
//       ) {
//         // hide the panel when clicking outside it
//         document.querySelector(".notification-btn")?.click();
//       }
//     };

//     if (visible) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [visible]);

//   if (!visible) return null;

//   const getTimeElapsed = (dateString) => {
//     const now = new Date();
//     const past = new Date(dateString);
//     const diff = now.getTime() - past.getTime();
//     const minutes = Math.floor(diff / 60000);
//     const hours = Math.floor(minutes / 60);
//     const days = Math.floor(hours / 24);
//     if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
//     if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
//     if (minutes > 0) return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
//     return "Just now";
//   };

//   const unreadCount = notifications.filter((n) => !n.read_status).length;
//   const totalCount = notifications.length;

//   return (
//     <div className="notifications-panel" ref={panelRef}>
//       <div className="notifications-header">
//         <div className="notification-counter">
//           <h3>Notifications</h3>
//           <span className="notification-count-indicator">
//             {unreadCount} unread / {totalCount} total
//           </span>
//         </div>
//         {unreadCount > 0 && (
//           <button className="mark-all-read" onClick={markAllNotificationsAsRead}>
//             <FaCheckDouble className="mark-read-icon" />
//             Mark all as read
//           </button>
//         )}
//       </div>

//       <div className="notifications-list">
//         {notifications.length === 0 ? (
//           <div className="no-notifications">
//             <div className="empty-notifications-icon">
//               <FaBell />
//             </div>
//             <p>No notifications yet</p>
//           </div>
//         ) : (
//           notifications.map((notification) => (
//             <div
//               key={notification.id}
//               className={`notification-item ${
//                 notification.read ? "read" : "unread"
//               }`}
//               onClick={() => markNotificationAsRead(notification.notification_PK)}
//             >
//               <div className="read-status-icon">
//                 {notification.read ? (
//                   <FaCheck className="read-icon" />
//                 ) : (
//                   <FaRegCircle className="unread-icon" />
//                 )}
//               </div>
//               <div className="notification-content">
//                 <p>{notification.message}</p>
//                 <span className="notification-time">
//                   {getTimeElapsed(notification.date)}
//                 </span>
//               </div>
//               {!notification.read && <span className="unread-indicator"></span>}
//             </div>
//           ))
//         )}
//       </div>

//       <div className="notifications-footer">
//         <p className="notification-tip">Click on a notification to mark it as read</p>
//       </div>
//     </div>
//   );
// };

// export default NotificationsPanel;

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
