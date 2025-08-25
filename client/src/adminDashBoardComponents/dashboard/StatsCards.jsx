import React from "react";

const StatsCards = ({ stats }) => {
  
  return (
    <div className="admin-dashboard-stats-grid">
      <div className="admin-dashboard-stat-card total">
        <div className="admin-dashboard-stat-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        <div className="admin-dashboard-stat-content">
          <h3>Total Complaints</h3>
          <div className="admin-dashboard-stat-value">{stats.total}</div>
        </div>
      </div>

      <div className="admin-dashboard-stat-card pending">
        <div className="admin-dashboard-stat-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div className="admin-dashboard-stat-content">
          <h3>Pending</h3>
          <div className="admin-dashboard-stat-value">{stats.pending}</div>
        </div>
      </div>

      <div className="admin-dashboard-stat-card in-progress">
        <div className="admin-dashboard-stat-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
        </div>
        <div className="admin-dashboard-stat-content">
          <h3>In Progress</h3>
          <div className="admin-dashboard-stat-value">{stats.inProgress}</div>
        </div>
      </div>

      <div className="admin-dashboard-stat-card completed">
        <div className="admin-dashboard-stat-icon-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div className="admin-dashboard-stat-content">
          <h3>Completed</h3>
          <div className="admin-dashboard-stat-value">{stats.completed}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
