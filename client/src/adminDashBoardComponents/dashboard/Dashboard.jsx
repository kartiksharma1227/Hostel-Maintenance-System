import React from "react";
import StatsCards from "./StatsCards";
import RecentComplaints from "./RecentComplaints";

const Dashboard = ({ complaints, handleViewDetails, handleAssignEngineer }) => {
  return (
    <div className="dashboard-overview">
      <h2>Dashboard</h2>
      <StatsCards complaints={complaints} />
      <RecentComplaints
        complaints={complaints}
        handleViewDetails={handleViewDetails}
        handleAssignEngineer={handleAssignEngineer}
      />
    </div>
  );
};

export default Dashboard;
