// File: Dbms1/src/EngineerDashboardComponents/AssignedComplaints.jsx

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
import "../styles/EngineerDashboard.css";

export default function AssignedComplaints() {
  // state for fetched complaints
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // filter / search state
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // fetch data on mount and whenever filters change
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaint-history", {
          params: {
            status: statusFilter,
            category: "all",
            search: searchQuery,
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching assigned complaints:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaints();
  }, [statusFilter, searchQuery]);

  // apply client-side filtering for responsiveness
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // simple icons for priority
  const getPriorityIcon = (priority) =>
    priority === "High" ? "⚠️" :
    priority === "Medium" ? "🔶" :
    "✅";

  // simple icons for category
  const getCategoryIcon = (category) =>
    category === "Plumbing" ? "🚰" :
    category === "Electrical" ? "💡" :
    category === "Furniture" ? "🪑" :
    category === "HVAC" ? "❄️" :
    "⚙️";

  const handleViewDetails = (complaint) => {
    console.log("View details for", complaint);
    // TODO: open your details modal here
  };

  const handleOpenUpdateModal = (id) => {
    console.log("Open update modal for id", id);
    // TODO: open your update modal here
  };

  if (isLoading) {
    return <p>Loading assigned complaints...</p>;
  }

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
