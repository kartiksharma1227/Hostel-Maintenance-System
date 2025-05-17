import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/EngineerDashboard.css";

export default function NewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDate, setFilterDate] = useState("");

  // Fetch all complaints
  useEffect(() => {
    axios
      .get("/api/complaint-history", { params: { status: "all", category: "all", search: "" } })
      .then((res) => {
        setComplaints(res.data);
        // Initialize filterDate to first available date or today
        const dates = res.data.map((c) => (c.updated_at || c.created_at || "").split("T")[0]);
        const unique = [...new Set(dates)].filter((d) => d);
        setFilterDate(unique.length > 0 ? unique[0] : "");
      })
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Helper functions for UI elements
  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "🔴";
      case "medium":
        return "🟠";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case "electrical":
        return "⚡";
      case "plumbing":
        return "🔧";
      case "structural":
        return "🏗️";
      case "appliance":
        return "🧰";
      case "network":
        return "🌐";
      case "security":
        return "🔒";
      default:
        return "📋";
    }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) return (
    <div className="engineer-loading">
      <div className="engineer-loading-spinner"></div>
      <p>Loading complaints...</p>
    </div>
  );

  // Get list of unique dates for dropdown
  const dateOptions = [...new Set(
    complaints
      .map((c) => (c.updated_at || c.created_at || "").split("T")[0])
      .filter((d) => d)
  )].sort((a, b) => new Date(b) - new Date(a)); // Sort newest first

  // Filter complaints by selected date
  const filtered = complaints.filter((c) => {
    const datePart = (c.updated_at || c.created_at || "").split("T")[0];
    return datePart === filterDate;
  });

  return (
    <div className="engineer-new-complaints">
      <div className="engineer-complaints-header">
        <h2>Complaints Dashboard</h2>
        <div className="engineer-filter-controls">
          <label htmlFor="date-select">Filter by date: </label>
          <select
            id="date-select"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="engineer-date-select"
          >
            {dateOptions.map((d) => (
              <option key={d} value={d}>
                {new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="engineer-section-description">
        Reviewing complaints updated on {new Date(filterDate).toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>

      {filtered.length === 0 ? (
        <div className="engineer-no-results">
          <span className="engineer-empty-icon">📥</span>
          <p>No complaints found for this date</p>
        </div>
      ) : (
        <div className="engineer-new-complaints-grid">
          {filtered.map((complaint) => (
            <div className="engineer-new-complaint-card" key={complaint.id}>
              <div className="engineer-complaint-header">
                <div className="engineer-complaint-title-container">
                  <h3 className="engineer-complaint-title">
                    #{complaint.id}: {complaint.title || "Untitled Complaint"}
                  </h3>
                  <span className={`engineer-priority-indicator ${complaint.priority?.toLowerCase() || "unknown"}`}>
                    {getPriorityIcon(complaint.priority)} {complaint.priority || "Unknown"}
                  </span>
                </div>
                <span className="engineer-complaint-date">
                  {formatDate(complaint.updated_at || complaint.created_at)}
                </span>
              </div>
              
              <div className="engineer-complaint-content">
                <div className="engineer-complaint-details">
                  <p className="engineer-complaint-description">
                    {complaint.description || "No description provided"}
                  </p>
                  
                  <div className="engineer-complaint-meta-info">
                    <p className="engineer-complaint-category">
                      <span className="engineer-info-icon">
                        {getCategoryIcon(complaint.category)}
                      </span> 
                      Category: {complaint.category || "Uncategorized"}
                    </p>
                    
                    <p className="engineer-complaint-location">
                      <span className="engineer-info-icon">📍</span> 
                      Location: {complaint.location || "Not specified"}
                    </p>
                    
                    <p className="engineer-complaint-status">
                      <span className="engineer-info-icon">🔄</span> 
                      Status: {complaint.status || "New"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}