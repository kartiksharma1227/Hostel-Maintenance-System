import React, { useState, useEffect } from "react";
import "../styles/EngineerDashboard.css";

export default function NewComplaints({
  pendingComplaints,
  handleAcceptComplaint,
  handleRejectComplaint,
  getPriorityIcon,
  getCategoryIcon,
  handleViewDetails,
}) {
  const [filterDate, setFilterDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const complaints = pendingComplaints || [];
  // console.log("Pending Complaints in New complaint:", complaints);

  // Format date to be more readable
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleDateSelection = (date) => {
    setFilterDate(date);
    setDropdownOpen(false);
  };

  const formatDateForDropdown = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const dateOptions = [...new Set(
    complaints
      .map((c) => (c.updated_at || c.created_at || "").split("T")[0])
      .filter((d) => d)
  )].sort((a, b) => new Date(b) - new Date(a));

  useEffect(() => {
    if (dateOptions.length > 0 && !filterDate) {
      setFilterDate(dateOptions[0]);
    }
  }, [dateOptions]);

  const filtered = complaints.filter((c) => {
    const datePart = (c.updated_at || c.created_at || "").split("T")[0];
    return datePart === filterDate;
  });

  return (
    <div className="engineer-new-complaints">
      <div className="engineer-complaints-header">
        <h2>Complaints Dashboard</h2>

        <div style={{ position: "relative", display: "inline-block" }}>
          <label
            htmlFor="date-select"
            style={{ marginBottom: "6px", display: "block", fontWeight: 500 }}
          >
            Filter by date:
          </label>

          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              width: "250px",
              backgroundColor: "white",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
            }}
          >
            <span>
              {filterDate ? formatDateForDropdown(filterDate) : "Select date"}
            </span>
            <span
              style={{
                transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ▼
            </span>
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                width: "250px",
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "8px",
                zIndex: 100,
                maxHeight: "250px",
                overflowY: "auto",
              }}
            >
              {dateOptions.map((d) => (
                <div
                  key={d}
                  onClick={() => handleDateSelection(d)}
                  style={{
                    padding: "10px 16px",
                    cursor: "pointer",
                    backgroundColor: filterDate === d ? "#f3f4f6" : "white",
                    fontWeight: filterDate === d ? 600 : 400,
                  }}
                >
                  {formatDateForDropdown(d)}
                  {filterDate === d && <span style={{ float: "right" }}>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="engineer-section-description">
        Reviewing complaints updated on {formatDateForDropdown(filterDate)}
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
                    {complaint.
complaint_id
}: {complaint.title || "Untitled Complaint"}
                  </h3>
                  <span
                    className={`engineer-priority-indicator ${
                      complaint.priority?.toLowerCase() || "unknown"
                    }`}
                  >
                    {getPriorityIcon(complaint.priority)} {complaint.priority || "Unknown"}
                  </span>
                </div>
                {/* <span className="engineer-complaint-date">
                  {formatDate(complaint.assigned_date || complaint.created_at)}
                </span> */}
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
                      Updated At: {formatDate(complaint.assigned_date) || "Uncategorized"}
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

                <div className="engineer-complaint-actions">
                  <button
                    className="engineer-accept-btn"
                    onClick={() => handleAcceptComplaint(complaint)}
                  >
                    ✅ Accept
                  </button>
                  <button
                    className="engineer-reject-btn"
                    onClick={() => handleRejectComplaint(complaint)}
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
