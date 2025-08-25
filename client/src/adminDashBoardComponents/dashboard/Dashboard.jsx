import React from "react";
import StatsCards from "./StatsCards";
import RecentComplaints from "./RecentComplaints";

const Dashboard = ({ complaints, handleViewDetails, handleAssignEngineer,stats }) => {
  return (
    <div className="admin-dashboard-overview">
      <div className="admin-dashboard-section-header">
        <h2 className="admin-dashboard-section-title">Dashboard Overview</h2>
        <p className="admin-dashboard-section-subtitle">
          Monitor system metrics and recent activities
        </p>
      </div>
      <StatsCards stats={stats} />
      <div className="admin-dashboard-card">
        <div className="admin-dashboard-card-header">
          <h3 className="admin-dashboard-card-title">Recent Complaints</h3>
        </div>
        <div className="admin-dashboard-card-content">
          <RecentComplaints
            complaints={complaints}
            handleViewDetails={handleViewDetails}
            handleAssignEngineer={handleAssignEngineer}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
