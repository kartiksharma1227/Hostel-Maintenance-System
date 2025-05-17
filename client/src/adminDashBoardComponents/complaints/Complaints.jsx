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
    <div className="complaints-container">
      <h2>All Complaints</h2>
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
  );
};

export default Complaints;
