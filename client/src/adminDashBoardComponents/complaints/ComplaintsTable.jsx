import React, { useState } from "react";
import ComplaintDetailsModal from "./ComplaintDetailsModal";

const ComplaintsTable = ({
  complaints,
  handleAssignEngineer,
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
}) => {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (complaint.submittedBy?.name &&
        complaint.submittedBy.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" ||
      complaint.status.toLowerCase().replace(" ", "-") === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="admin-dashboard-complaints-section">
      {showModal && selectedComplaint && (
        <div className="admin-dashboard-modal-overlay">
          <ComplaintDetailsModal
            complaint={selectedComplaint}
            onClose={closeModal}
            onAssignEngineer={handleAssignEngineer}
          />
        </div>
      )}

      <div className="admin-dashboard-filters-container">
        <div className="admin-dashboard-input-icon-wrapper">
          <span className="admin-dashboard-input-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by title, category, location or submitter..."
            className="admin-dashboard-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="admin-dashboard-filter-select"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="admin-dashboard-empty-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ color: "#ccc", marginBottom: "1rem" }}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="15" x2="16" y2="15"></line>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <p className="admin-dashboard-empty-text">
            No complaints found matching your filters
          </p>
          <button
            className="admin-dashboard-btn"
            onClick={() => {
              onStatusFilterChange("all");
              onSearchChange("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="admin-dashboard-table-responsive">
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Submitted By</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>#{complaint.id}</td>
                  <td className="admin-dashboard-title-cell">
                    {complaint.title}
                  </td>
                  <td>{complaint.submittedBy?.name || "Unknown"}</td>
                  <td>
                    <span className="admin-dashboard-category-badge">
                      {complaint.category}
                    </span>
                  </td>
                  <td>{complaint.location}</td>
                  <td>
                    <span
                      className={`admin-dashboard-badge ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td>{formatDate(complaint.dateSubmitted)}</td>
                  <td>
                    <div className="admin-dashboard-action-buttons">
                      <button
                        className="admin-dashboard-btn admin-dashboard-view-btn"
                        onClick={() => openModal(complaint)}
                        title="View Details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ marginRight: "5px" }}
                        >
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        View
                      </button>
                      {complaint.status === "Pending" && (
                        <button
                          className="admin-dashboard-btn admin-dashboard-assign-btn"
                          onClick={() => handleAssignEngineer(complaint.id)}
                          title="Assign Engineer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: "5px" }}
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                          </svg>
                          Assign
                        </button>
                      )}
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
};

export default ComplaintsTable;
