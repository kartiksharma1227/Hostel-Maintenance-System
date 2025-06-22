// src/EngineerDashBoardComponents/ComplaintHistory.jsx
import React, { useState } from "react";
import {
  FaStar,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaCheck,
  FaCalendarCheck,
} from "react-icons/fa";
import { MdOutlineFilterAlt } from "react-icons/md";
import "../styles/EngineerComplaintHistory.css";

const ComplaintHistory = ({
  completedComplaints,
  searchQuery,
  setSearchQuery,
  getCategoryIcon,
  handleViewDetails,
}) => {
  const [sortOption, setSortOption] = useState("latest");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories from complaints
  const categories = [
    "all",
    ...new Set(completedComplaints.map((c) => c.category)),
  ];

  // Filter complaints based on search query and category filter
  const filteredComplaints = completedComplaints.filter((complaint) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      complaint.title.toLowerCase().includes(query) ||
      complaint.category.toLowerCase().includes(query) ||
      complaint.location.toLowerCase().includes(query) ||
      (complaint.studentName || "").toLowerCase().includes(query);

    const matchesCategory =
      filterCategory === "all" || complaint.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Sort complaints based on selected option
  const sortedComplaints = [...filteredComplaints].sort((a, b) => {
    if (sortOption === "latest") {
      return (
        new Date(b.completedDate || b.updated_at) -
        new Date(a.completedDate || a.updated_at)
      );
    } else if (sortOption === "oldest") {
      return (
        new Date(a.completedDate || a.updated_at) -
        new Date(b.completedDate || b.updated_at)
      );
    } else if (sortOption === "highest-rated") {
      return (b.rating || 0) - (a.rating || 0);
    }
    return 0;
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const iso = dateStr.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
  };

  // Calculate summary statistics
  const totalCompleted = completedComplaints.length;
  const averageRating =
    completedComplaints.filter((c) => c.rating).length > 0
      ? (
          completedComplaints.reduce((sum, c) => sum + (c.rating || 0), 0) /
          completedComplaints.filter((c) => c.rating).length
        ).toFixed(1)
      : 0;
  const withFeedback = completedComplaints.filter((c) => c.rating).length;

  return (
    <div className="engineerDashboard-completed-complaints-history-container">
      <div className="engineerDashboard-completed-complaints-history-page-header">
        <div className="engineerDashboard-completed-complaints-history-page-title">
          <h2>Completed Complaints History</h2>
          <p className="engineerDashboard-completed-complaints-history-page-subtitle">
            View and manage your completed complaint tickets
          </p>
        </div>

        <div className="engineerDashboard-completed-complaints-history-header-actions">
          <button
            className="engineerDashboard-completed-complaints-history-filter-toggle-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <MdOutlineFilterAlt />
            Filters {showFilters ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="engineerDashboard-completed-complaints-history-summary-cards">
        <div className="engineerDashboard-completed-complaints-history-summary-card">
          <div className="engineerDashboard-completed-complaints-history-summary-icon completed">
            <FaCheck />
          </div>
          <div className="engineerDashboard-completed-complaints-history-summary-content">
            <h4>Total Resolved</h4>
            <p className="engineerDashboard-completed-complaints-history-summary-value">
              {totalCompleted}
            </p>
          </div>
        </div>

        <div className="engineerDashboard-completed-complaints-history-summary-card">
          <div className="engineerDashboard-completed-complaints-history-summary-icon ratings">
            <FaStar />
          </div>
          <div className="engineerDashboard-completed-complaints-history-summary-content">
            <h4>Average Rating</h4>
            <p className="engineerDashboard-completed-complaints-history-summary-value">
              {averageRating}{" "}
              <span className="engineerDashboard-completed-complaints-history-small-text">
                / 5
              </span>
            </p>
          </div>
        </div>

        <div className="engineerDashboard-completed-complaints-history-summary-card">
          <div className="engineerDashboard-completed-complaints-history-summary-icon feedback">
            <FaCalendarCheck />
          </div>
          <div className="engineerDashboard-completed-complaints-history-summary-content">
            <h4>With Feedback</h4>
            <p className="engineerDashboard-completed-complaints-history-summary-value">
              {withFeedback}{" "}
              <span className="engineerDashboard-completed-complaints-history-small-text">
                of {totalCompleted}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Filters and search section */}
      <div
        className={`engineerDashboard-completed-complaints-history-complaint-filters ${
          showFilters ? "expanded" : ""
        }`}
      >
        <div className="engineerDashboard-completed-complaints-history-search-container">
          <div className="engineerDashboard-completed-complaints-history-search-input-wrapper">
            <FaSearch className="engineerDashboard-completed-complaints-history-search-icon" />
            <input
              type="text"
              placeholder="Search completed complaints..."
              className="engineerDashboard-completed-complaints-history-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="engineerDashboard-completed-complaints-history-clear-search"
                onClick={() => setSearchQuery("")}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="engineerDashboard-completed-complaints-history-filter-options">
            <div className="engineerDashboard-completed-complaints-history-filter-group">
              <label className="engineerDashboard-completed-complaints-history-filter-label">
                <FaFilter className="engineerDashboard-completed-complaints-history-filter-icon" />
                Filter by Category:
              </label>
              <select
                className="engineerDashboard-completed-complaints-history-select"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="engineerDashboard-completed-complaints-history-filter-group">
              <label className="engineerDashboard-completed-complaints-history-filter-label">
                <FaSortAmountDown className="engineerDashboard-completed-complaints-history-filter-icon" />
                Sort by:
              </label>
              <select
                className="engineerDashboard-completed-complaints-history-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="latest">Latest Completed</option>
                <option value="oldest">Oldest Completed</option>
                <option value="highest-rated">Highest Rated</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {sortedComplaints.length === 0 ? (
        <div className="engineerDashboard-completed-complaints-history-no-results">
          <div className="engineerDashboard-completed-complaints-history-no-results-icon">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 9L9 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 9L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="engineerDashboard-completed-complaints-history-no-results-text">
            No completed complaints found
          </p>
          <p className="engineerDashboard-completed-complaints-history-no-results-hint">
            Try adjusting your filters or search terms
          </p>
        </div>
      ) : (
        <div className="engineerDashboard-completed-complaints-history-complaints-container">
          <div className="engineerDashboard-completed-complaints-history-results-info">
            <p>
              Showing {sortedComplaints.length} of {completedComplaints.length}{" "}
              completed complaints
            </p>
          </div>
          <div className="engineerDashboard-completed-complaints-history-table-responsive">
            <table className="engineerDashboard-completed-complaints-history-complaints-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Completion Date</th>
                  <th>Feedback</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedComplaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="engineerDashboard-completed-complaints-history-complaint-row"
                  >
                    <td className="engineerDashboard-completed-complaints-history-complaint-id">
                      #{complaint.id}
                    </td>
                    <td
                      className="engineerDashboard-completed-complaints-history-complaint-title"
                      title={complaint.title}
                    >
                      {complaint.title}
                    </td>
                    <td>
                      <span className="engineerDashboard-completed-complaints-history-category-label">
                        <span className="engineerDashboard-completed-complaints-history-category-icon">
                          {getCategoryIcon(complaint.category)}
                        </span>
                        {complaint.category}
                      </span>
                    </td>
                    <td>{complaint.location}</td>
                    <td className="engineerDashboard-completed-complaints-history-completion-date">
                      {formatDate(
                        complaint.completedDate || complaint.updated_at
                      )}
                    </td>
                    <td>
                      {complaint.status?.toLowerCase() === "completed" &&
                        (complaint.rating ? (
                          <div className="engineerDashboard-completed-complaints-history-feedback-rating">
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                className={`engineerDashboard-completed-complaints-history-star ${
                                  index < complaint.rating ? "filled" : "empty"
                                }`}
                              />
                            ))}
                            <span className="engineerDashboard-completed-complaints-history-rating-value">
                              {complaint.rating}
                            </span>
                          </div>
                        ) : (
                          <span className="engineerDashboard-completed-complaints-history-no-feedback">
                            No feedback
                          </span>
                        ))}
                    </td>
                    <td>
                      <button
                        className="engineerDashboard-completed-complaints-history-action-btn engineerDashboard-completed-complaints-history-view-btn"
                        onClick={() => handleViewDetails(complaint)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintHistory;
