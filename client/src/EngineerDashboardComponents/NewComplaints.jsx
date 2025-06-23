import React, { useState, useEffect } from "react";
import "../styles/EngineerDashboard.css";
import "../styles/EngineerNewComplaints.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const complaints = pendingComplaints || [];

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
    // return new Date(dateString).toLocaleDateString("en-US", {
    //   year: "numeric",
    //   month: "short",
    //   day: "numeric",
    // });
    if (!dateString) return "N/A";

  // Split and extract date/time parts manually
  const [datePart, timePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-");
  const [hour, minute, second] = timePart.split(":");

  // Create local Date object (not UTC)
  const date = new Date(
    year,
    month - 1, // Month is 0-indexed
    day,
    hour,
    minute,
    second
  );

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  };

  const dateOptions = [
    ...new Set(
      complaints
        .map((c) => (c.updated_at || c.created_at || "").split("T")[0])
        .filter((d) => d)
    ),
  ].sort((a, b) => new Date(b) - new Date(a));

  useEffect(() => {
    if (dateOptions.length > 0 && !filterDate) {
      setFilterDate(dateOptions[0]);
    }
  }, [dateOptions]);

  // Get unique categories for filter
  const categories = [
    "all",
    ...new Set(complaints.map((c) => c.category).filter(Boolean)),
  ];

  // Get unique priorities for filter
  // const priorities = [
  //   "all",
  //   ...new Set(complaints.map((c) => c.priority).filter(Boolean)),
  // ];
  const priorities = ["all", "Low", "Medium", "High"];

  const filteredComplaints = complaints.filter((c) => {
    const datePart = (c.updated_at || c.created_at || "").split("T")[0];
    const dateMatch = datePart === filterDate;

    // Search functionality
    const searchMatch =
      searchQuery === "" ||
      (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.description &&
        c.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.location &&
        c.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.complaint_id &&
        c.complaint_id.toString().includes(searchQuery.toLowerCase()));

    // Category filter
    const categoryMatch =
      categoryFilter === "all" || c.category === categoryFilter;

    // Priority filter
    const priorityMatch =
      priorityFilter === "all" || c.priority === priorityFilter;

    return dateMatch && searchMatch && categoryMatch && priorityMatch;
  });

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setPriorityFilter("all");
  };

  // Calculate statistics for display
  const pendingCount = filteredComplaints.length;

  return (
    <div className="engineer-new-complaints-container">
      <div className="engineer-new-complaints-header">
        <div className="engineer-new-complaints-header-content">
          <h2 className="engineer-new-complaints-title">
            New Complaints Dashboard
          </h2>
          <p className="engineer-new-complaints-subtitle">
            Review and respond to pending complaints assigned to your department
          </p>
        </div>
      </div>

      <div className="engineer-new-complaints-filters-container">
        <div className="engineer-new-complaints-search-container">
          <div className="engineer-new-complaints-search">
            <span className="engineer-new-complaints-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by complaint ID, title, description or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="engineer-new-complaints-search-input"
            />
          </div>

          <div className="engineer-new-complaints-filters">
            <div className="engineer-new-complaints-filter-row">
              <div className="engineer-new-complaints-filter-group">
                <label className="engineer-new-complaints-filter-label">
                  Category
                </label>
                <select
                  className="engineer-new-complaints-filter-select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="engineer-new-complaints-filter-group">
                <label className="engineer-new-complaints-filter-label">
                  Priority
                </label>
                <select
                  className="engineer-new-complaints-filter-select"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                >
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority === "all" ? "All Priorities" : priority}
                    </option>
                  ))}
                </select>
              </div>

              <div className="engineer-new-complaints-filter-group">
                <label className="engineer-new-complaints-filter-label">
                  Date
                </label>
                <select
                  className="engineer-new-complaints-filter-select"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                >
                  {dateOptions.map((date) => (
                    <option key={date} value={date}>
                      {formatDateForDropdown(date)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="engineer-new-complaints-summary">
        <div className="engineer-new-complaints-count">
          <span className="engineer-new-complaints-count-number">
            {pendingCount}
          </span>
          <span className="engineer-new-complaints-count-label">
            Pending Complaints
          </span>
        </div>
        <div className="engineer-new-complaints-date-indicator">
          <span className="engineer-new-complaints-date-icon">📅</span>
          <span>
            Viewing complaints from{" "}
            <span className="engineer-new-complaints-highlight">
              {formatDateForDropdown(filterDate)}
            </span>
          </span>
        </div>
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="engineer-new-complaints-empty">
          <div className="engineer-new-complaints-empty-icon">📥</div>
          <h3 className="engineer-new-complaints-empty-title">
            No complaints found
          </h3>
          <p className="engineer-new-complaints-empty-message">
            {searchQuery || categoryFilter !== "all" || priorityFilter !== "all"
              ? "Try adjusting your filters to see more results"
              : "There are no pending complaints for this date"}
          </p>
          {(searchQuery ||
            categoryFilter !== "all" ||
            priorityFilter !== "all") && (
            <button
              className="engineer-new-complaints-reset-button"
              onClick={handleClearFilters}
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="engineer-new-complaints-grid">
          {filteredComplaints.map((complaint) => (
            <div
              className={`engineer-new-complaints-card priority-${
                complaint.priority?.toLowerCase() || "unknown"
              }`}
              key={complaint.id}
            >
              <div className="engineer-new-complaints-card-header">
                <div className="engineer-new-complaints-card-title-container">
                  <h3 className="engineer-new-complaints-card-title">
                    <span className="engineer-new-complaints-complaint-id">
                      #{complaint.id}
                    </span>
                    {complaint.title || "Untitled Complaint"}
                  </h3>
                  <span
                    className={`engineer-new-complaints-priority ${
                      complaint.priority?.toLowerCase() || "unknown"
                    }`}
                  >
                    {getPriorityIcon(complaint.priority)}{" "}
                    {complaint.priority || "Unknown"}
                  </span>
                </div>
                <div className="engineer-new-complaints-card-timestamp">
                  <span className="engineer-new-complaints-timestamp-icon">
                    🕒
                  </span>
                  {formatDate(complaint.assigned_date || complaint.created_at)}
                </div>
              </div>

              <div className="engineer-new-complaints-card-content">
                <div className="engineer-new-complaints-card-details">
                  <p className="engineer-new-complaints-card-description">
                    {complaint.description || "No description provided"}
                  </p>

                  <div className="engineer-new-complaints-card-metadata">
                    <div className="engineer-new-complaints-card-metadata-item">
                      <span className="engineer-new-complaints-card-icon">
                        {getCategoryIcon(complaint.category)}
                      </span>
                      <div className="engineer-new-complaints-card-metadata-content">
                        <span className="engineer-new-complaints-card-metadata-label">
                          Category
                        </span>
                        <span className="engineer-new-complaints-card-metadata-value">
                          {complaint.category || "Uncategorized"}
                        </span>
                      </div>
                    </div>

                    <div className="engineer-new-complaints-card-metadata-item">
                      <span className="engineer-new-complaints-card-icon">
                        📍
                      </span>
                      <div className="engineer-new-complaints-card-metadata-content">
                        <span className="engineer-new-complaints-card-metadata-label">
                          Location
                        </span>
                        <span className="engineer-new-complaints-card-metadata-value">
                          {complaint.location || "Not specified"}
                        </span>
                      </div>
                    </div>

                    <div className="engineer-new-complaints-card-metadata-item">
                      <span className="engineer-new-complaints-card-icon">
                        🔄
                      </span>
                      <div className="engineer-new-complaints-card-metadata-content">
                        <span className="engineer-new-complaints-card-metadata-label">
                          Status
                        </span>
                        <span className="engineer-new-complaints-card-metadata-value">
                          <span
                            className={`engineer-new-complaints-status-badge ${
                              complaint.status?.toLowerCase() || "new"
                            }`}
                          >
                            {complaint.status || "New"}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div className="engineer-new-complaints-card-metadata-item">
                      <span className="engineer-new-complaints-card-icon">
                        👤
                      </span>
                      <div className="engineer-new-complaints-card-metadata-content">
                        <span className="engineer-new-complaints-card-metadata-label">
                          Reported By
                        </span>
                        <span className="engineer-new-complaints-card-metadata-value">
                          {complaint.submitted_by ||
                            "Anonymous"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="engineer-new-complaints-card-actions">
                  <button
                    className="engineer-new-complaints-card-btn view"
                    onClick={() => handleViewDetails(complaint)}
                  >
                    <span className="engineer-new-complaints-btn-icon">👁️</span>
                    View Details
                  </button>
                  <div className="engineer-new-complaints-card-action-buttons">
                    <button
                      className="engineer-new-complaints-card-btn accept"
                      onClick={() => handleAcceptComplaint(complaint)}
                    >
                      <span className="engineer-new-complaints-btn-icon">
                        ✅
                      </span>
                      Accept
                    </button>
                    <button
                      className="engineer-new-complaints-card-btn reject"
                      onClick={() => handleRejectComplaint(complaint)}
                    >
                      <span className="engineer-new-complaints-btn-icon">
                        ❌
                      </span>
                      Reject
                    </button>
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
