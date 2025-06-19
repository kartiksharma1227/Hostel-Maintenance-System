


import React, { useState } from "react";
export default function AssignedComplaints({
  complaints,
  setStatusFilter,
  statusFilter,
  searchQuery,
  setSearchQuery,
  getCategoryIcon,
  getPriorityIcon,
  handleViewDetails,
  handleOpenUpdateModal,
}) {
  // console.log("Assigned Complaints received:", complaints);

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesStatus =
      statusFilter === "all" ||
      complaint.status.toLowerCase().replace(" ", "-") === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      complaint.title.toLowerCase().includes(query) ||
      complaint.description?.toLowerCase().includes(query) ||
      complaint.location?.toLowerCase().includes(query) ||
      complaint.category?.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    
    <div className="engineer-assigned-complaints">
      <h2>Assigned Complaints</h2>

      <div className="engineer-complaint-filters">
        <select
          className="engineer-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Complaints</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
        </select>

        <input
          type="text"
          placeholder="Search complaints..."
          className="engineer-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="engineer-no-results">
          <p>No complaints found matching your filters</p>
          <button
            className="engineer-reset-filter-btn"
            onClick={() => {
              setStatusFilter("all");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="engineer-table-container" style={{ overflowX: "auto" }}>
          <table className="engineer-complaints-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>#{complaint.id}</td>
                  <td>{complaint.title}</td>
                  <td>
                    <span className="engineer-category-label">
                      <span className="engineer-category-icon">
                        {getCategoryIcon(complaint.category)}
                      </span>
                      {complaint.category}
                    </span>
                  </td>
                  <td>{complaint.location}</td>
                  <td>
                    <span
                      className={`engineer-priority-indicator ${complaint.priority}`}
                    >
                      {getPriorityIcon(complaint.priority)} {complaint.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`engineer-status-badge ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td>{complaint.assignedDate || complaint.created_at}</td>
                  <td>
                    <div className="engineer-action-buttons">
                      <button
                        className="engineer-action-btn engineer-view-btn"
                        onClick={() => handleViewDetails(complaint)}
                        title="View Details"
                      >
                        <span className="engineer-btn-icon">👁️</span> View
                      </button>
                      <button
                        className="engineer-action-btn engineer-update-btn"
                        onClick={() => handleOpenUpdateModal(complaint.id)}
                        title="Update Status"
                      >
                        <span className="engineer-btn-icon">🔄</span> Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
