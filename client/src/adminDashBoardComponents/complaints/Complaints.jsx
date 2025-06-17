import React, { useState } from "react";
import ComplaintsTable from "./ComplaintsTable";

const Complaints = ({
  complaints,
  handleViewDetails,
  handleAssignEngineer,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="admin-dashboard-complaints-container">
      <div className="admin-dashboard-section-header">
        <h2 className="admin-dashboard-section-title">
          Maintenance Complaints
        </h2>
        <p className="admin-dashboard-section-subtitle">
          Manage and track all maintenance requests from students
        </p>
      </div>

      <div className="admin-dashboard-card">
        <ComplaintsTable
          complaints={complaints}
          handleViewDetails={handleViewDetails}
          handleAssignEngineer={handleAssignEngineer}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
        />
      </div>
    </div>
  );
};

export default Complaints;
