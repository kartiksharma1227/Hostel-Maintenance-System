// File: Dbms1/src/studentDashBoardComponents/complaints/ComplaintHistory.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaEye,
  FaStar,
  FaTrash,
  FaFilter,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ComplaintHistory = ({ onViewDetails, onFeedback, onDelete }) => {
  // --- data & loading state now live inside this component ---
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // existing filter/search state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // fetch complaints from backend on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaint-history", {
          params: { status: "all", category: "all", search: "" },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // apply same client-side filtering as before
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || complaint.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || complaint.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = ["all", ...new Set(complaints.map((c) => c.category))];
  const statuses = ["all", "pending", "in-progress", "completed"];

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading complaint history...</p>
      </div>
    );
  }

  return (
    <div className="complaint-history">
      <div className="section-header">
        <h2>Complaint History</h2>
        <span className="complaint-count">
          {filteredComplaints.length} complaints
        </span>
      </div>

      <div className="complaint-filters">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-wrapper">
          <div className="filter-label">
            <FaFilter className="filter-icon" />
            <span>Filters:</span>
          </div>

          <div className="select-wrapper">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === "all"
                    ? "All Statuses"
                    : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="complaints-grid">
        {filteredComplaints.length === 0 ? (
          <div className="no-results">
            <p>No complaints found matching your filters</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card enhanced">
              <div className="card-header">
                <div className="category-indicator">{complaint.category}</div>
                <span className={`status-badge ${complaint.status}`}>
                  {complaint.status}
                </span>
              </div>

              <h4 className="complaint-title">{complaint.title}</h4>
              <p className="complaint-excerpt">{complaint.description}</p>

              <div className="card-footer">
                <div className="complaint-meta">
                  <span>
                    <FaMapMarkerAlt className="meta-icon" />
                    {complaint.location}
                  </span>
                  <span>
                    <FaCalendarAlt className="meta-icon" />
                    {new Date(
                      complaint.created_at || complaint.createdAt
                    ).toLocaleDateString()}
                  </span>
                  {complaint.priority && (
                    <span
                      className={`priority-indicator ${complaint.priority}`}
                    >
                      {complaint.priority}
                    </span>
                  )}
                </div>
              </div>

              <div className="card-action">
                <button
                  className="view-details-btn"
                  onClick={() => onViewDetails(complaint)}
                >
                  <FaEye /> View Details
                </button>
              </div>

              <div className="action-buttons">
                {complaint.status === "completed" && !complaint.feedback && (
                  <button
                    className="action-btn feedback-btn"
                    onClick={(e) => { e.stopPropagation(); onFeedback(complaint); }}
                  >
                    <FaStar /> Feedback
                  </button>
                )}
                {complaint.status === "pending" && (
                  <button
                    className="action-btn delete-btn"
                    onClick={(e) => { e.stopPropagation(); onDelete(complaint); }}
                  >
                    <FaTrash /> Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComplaintHistory;
