// src/EngineerDashBoardComponents/ComplaintHistory.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

const ComplaintHistory = ({
  completedComplaints,
  searchQuery,
  setSearchQuery,
  getCategoryIcon,
  handleViewDetails,
}) => {
  const filteredComplaints = completedComplaints.filter((complaint) => {
    const query = searchQuery.toLowerCase();
    return (
      complaint.title.toLowerCase().includes(query) ||
      complaint.category.toLowerCase().includes(query) ||
      complaint.location.toLowerCase().includes(query) ||
      (complaint.studentName || "").toLowerCase().includes(query)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const iso = dateStr.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
  };

  return (
    <div className="engineer-complaint-history">
      <h2>Completed Complaints History</h2>
      <div className="engineer-complaint-filters">
        <input
          type="text"
          placeholder="Search completed complaints..."
          className="engineer-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="engineer-no-results">
          <p>No completed complaints found</p>
        </div>
      ) : (
        <table className="engineer-complaints-table">
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
                <td>{formatDate(complaint.completedDate || complaint.updated_at)}</td>
                <td>
                  {complaint.status?.toLowerCase() === "completed" && (
                    complaint.rating ? (
                      <div className="submitted-feedback">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            color={index < complaint.rating ? "gold" : "#ccc"}
                            style={{ marginRight: "2px" }}
                          />
                        ))}
                      </div>
                    ) : (
                      <span>No feedback</span>
                    )
                  )}
                </td>
                <td>
                  <button
                    className="engineer-action-btn engineer-view-btn"
                    onClick={() => handleViewDetails(complaint)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComplaintHistory;
