// src/EngineerDashBoardComponents/ComplaintHistory.jsx
const ComplaintHistory = ({ completedComplaints, searchQuery, setSearchQuery, getCategoryIcon, handleViewDetails }) => {
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
      {completedComplaints.length === 0 ? (
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
            {completedComplaints
              .filter(
                (complaint) =>
                  searchQuery.trim() === "" ||
                  complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  complaint.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  complaint.studentName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((complaint) => (
                <tr key={complaint.id}>
                  <td>#{complaint.id}</td>
                  <td>{complaint.title}</td>
                  <td>
                    <span className="engineer-category-label">
                      <span className="engineer-category-icon">{getCategoryIcon(complaint.category)}</span>
                      {complaint.category}
                    </span>
                  </td>
                  <td>{complaint.location}</td>
                  <td>{complaint.completedDate}</td>
                  <td>
                    {complaint.feedback ? (
                      <div className="engineer-feedback-display">
                        <div className="engineer-star-rating">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={i < complaint.feedback.rating ? "engineer-star filled" : "engineer-star"}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <span className="engineer-no-feedback">No feedback yet</span>
                    )}
                  </td>
                  <td>
                    <button className="engineer-action-btn engineer-view-btn" onClick={() => handleViewDetails(complaint)}>
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
