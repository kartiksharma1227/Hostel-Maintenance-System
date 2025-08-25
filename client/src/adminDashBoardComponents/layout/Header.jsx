import React from "react";

const Header = ({
  adminProfile,
  notifications,
  notificationPanelVisible,
  setNotificationPanelVisible,
  profileDropdownVisible,
  toggleProfileDropdown,
}) => {


  return (
    <header className="admin-dashboard-header">
      <div className="admin-dashboard-logo">
        <h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "10px" }}
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Hostel Maintenance System
        </h1>
      </div>
      <div className="admin-dashboard-header-controls">
        <button
          className="admin-dashboard-notification-btn"
          onClick={() => setNotificationPanelVisible(!notificationPanelVisible)}
          title="Notifications"
        >
          {notificationPanelVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"n
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          )}
         
            {notifications.filter((n) => !n.read_status).length > 0 && !notificationPanelVisible && (
  <span className="admin-dashboard-notification-badge">
    {notifications.filter((n) => !n.read_status).length}
  </span>
)}

        </button>
       
        <div
          className="admin-dashboard-user-profile"
          onClick={toggleProfileDropdown}
          style={{ cursor: "pointer" }}
        >
          {/* <span>{adminProfile.name || "Admin"}</span> */}
          
          <span>{adminProfile.name}</span>
        
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              adminProfile?.name || "Admin"
            )}&background=3f51b5&color=fff&bold=true`}
            alt="Profile"
            className="admin-dashboard-avatar"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
