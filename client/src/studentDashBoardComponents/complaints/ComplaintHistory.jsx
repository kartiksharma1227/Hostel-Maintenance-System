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
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import "../../styles/StudentComplaintHistory.css";

const ComplaintHistory = ({ onViewDetails, onFeedback, onDelete }) => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage.");
          return;
        }

        const decoded = jwtDecode(token);
        const roll_number = decoded.roll_number;
        // console.log("Decoded roll number:", roll_number);

        const response = await axios.get("/api/complaint-history", {
          params: {
            status: "all",
            category: "all",
            search: "",
            roll_number,
          },
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
  const statuses = ["all", "Pending", "In Progress", "Completed"];

  if (isLoading) {
    return (
      <div className="studentdashboard-complaint-history-loading-container">
        <div className="studentdashboard-complaint-history-loading-spinner"></div>
        <p>Loading complaint history...</p>
      </div>
    );
  }

  return (
    <div className="studentdashboard-complaint-history-container">
      <div className="studentdashboard-complaint-history-section-header">
        <h2>Complaint History</h2>
        <span className="studentdashboard-complaint-history-count">
          {filteredComplaints.length} complaints
        </span>
      </div>

      <div className="studentdashboard-complaint-history-filters">
        <div className="studentdashboard-complaint-history-search-bar">
          <FaSearch className="studentdashboard-complaint-history-search-icon" />
          <input
            type="text"
            placeholder="Search complaints..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="studentdashboard-complaint-history-search-input"
          />
        </div>

        <div className="studentdashboard-complaint-history-filters-wrapper">
          <div className="studentdashboard-complaint-history-filter-label">
            <FaFilter className="studentdashboard-complaint-history-filter-icon" />
            <span>Filters:</span>
          </div>

          <div className="studentdashboard-complaint-history-select-wrapper">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="studentdashboard-complaint-history-filter-select"
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

          <div className="studentdashboard-complaint-history-select-wrapper">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="studentdashboard-complaint-history-filter-select"
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

      <div className="studentdashboard-complaint-history-grid">
        {filteredComplaints.length === 0 ? (
          <div className="studentdashboard-complaint-history-no-results">
            <p>No complaints found matching your filters</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div
              key={complaint.id}
              className="studentdashboard-complaint-history-card"
            >
              <div className="studentdashboard-complaint-history-card-header">
                <div className="studentdashboard-complaint-history-category-indicator">
                  {complaint.category}
                </div>
                <span
                  className={`studentdashboard-complaint-history-status-badge studentdashboard-complaint-history-status-${complaint.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {complaint.status}
                </span>
              </div>

              <h4 className="studentdashboard-complaint-history-title">
                {complaint.title}
              </h4>
              <p className="studentdashboard-complaint-history-excerpt">
                {complaint.description}
              </p>

              <div className="studentdashboard-complaint-history-card-footer">
                <div className="studentdashboard-complaint-history-meta">
                  <span>
                    <FaMapMarkerAlt className="studentdashboard-complaint-history-meta-icon" />
                    {complaint.location}
                  </span>
                  <span>
                    <FaCalendarAlt className="studentdashboard-complaint-history-meta-icon" />
                    {new Date(
                      complaint.created_at || complaint.createdAt
                    ).toLocaleDateString()}
                  </span>
                  {complaint.priority && (
                    <span
                      className={`studentdashboard-complaint-history-priority-indicator studentdashboard-complaint-history-priority-${complaint.priority.toLowerCase()}`}
                    >
                      {complaint.priority}
                    </span>
                  )}
                </div>
              </div>

              <div className="studentdashboard-complaint-history-card-action">
                <button
                  className="studentdashboard-complaint-history-view-details-btn"
                  onClick={() => onViewDetails(complaint)}
                >
                  <FaEye /> View Details
                </button>
              </div>

              <div className="studentdashboard-complaint-history-action-buttons">
                {complaint.status?.toLowerCase() === "completed" &&
                  (complaint.rating ? (
                    <div className="studentdashboard-complaint-history-submitted-feedback">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          color={index < complaint.rating ? "gold" : "#ccc"}
                          style={{ marginRight: "2px" }}
                        />
                      ))}
                    </div>
                  ) : (
                    <button
                      className="studentdashboard-complaint-history-action-btn studentdashboard-complaint-history-feedback-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onFeedback(complaint);
                      }}
                    >
                      <FaStar /> Give Feedback
                    </button>
                  ))}

                {complaint.status === "pending" && (
                  <button
                    className="studentdashboard-complaint-history-action-btn studentdashboard-complaint-history-delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(complaint);
                    }}
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
