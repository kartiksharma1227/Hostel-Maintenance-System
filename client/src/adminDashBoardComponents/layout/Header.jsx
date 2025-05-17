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
    <header className="dashboard-header">
      <div className="logo">
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
          IIIT-A Maintenance
        </h1>
      </div>
      <div className="header-controls">
        <button
          className="notification-btn"
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
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          )}
          {notifications.filter((n) => !n.read).length > 0 &&
            !notificationPanelVisible && (
              <span className="notification-badge">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
        </button>
        <div className="user-profile">
          <span>Admin Portal</span>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              adminProfile.name
            )}&background=3f51b5&color=fff&bold=true`}
            alt="Profile"
            className="avatar"
            onClick={toggleProfileDropdown}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
