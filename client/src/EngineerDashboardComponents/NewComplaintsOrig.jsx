// src/EngineerDashBoardComponents/NewComplaints.jsx
const NewComplaints = ({
  pendingComplaints,
  getPriorityIcon,
  getCategoryIcon,
  handleViewDetails,
  handleRejectComplaint,
  handleAcceptComplaint,
}) => {
  return (
    <div className="engineer-new-complaints">
      <h2>New Complaints</h2>
      <p className="engineer-section-description">
        Review and either accept or reject these complaints to proceed.
      </p>
      {pendingComplaints.length === 0 ? (
        <div className="engineer-no-results">
          <span className="engineer-empty-icon">📥</span>
          <p>No new complaints to review</p>
        </div>
      ) : (
        <div className="engineer-new-complaints-grid">
          {pendingComplaints.map((complaint) => (
            <div className="engineer-new-complaint-card" key={complaint.id}>
              <div className="engineer-complaint-header">
                <div className="engineer-complaint-title-container">
                  <h3 className="engineer-complaint-title">
                    #{complaint.id}: {complaint.title}
                  </h3>
                  <span className={`engineer-priority-indicator ${complaint.priority}`}>
                    {getPriorityIcon(complaint.priority)} {complaint.priority}
                  </span>
                </div>
                <span className="engineer-complaint-date">{complaint.reportDate}</span>
              </div>
              <div className="engineer-complaint-content">
                <div className="engineer-complaint-details">
                  <p className="engineer-complaint-description">
                    {complaint.description.length > 100
                      ? `${complaint.description.substring(0, 100)}...`
                      : complaint.description}
                  </p>
                  <div className="engineer-complaint-meta-info">
                    <p className="engineer-complaint-location">
                      <span className="engineer-info-icon">📍</span> Location: {complaint.location}
                    </p>
                    <p className="engineer-complaint-category">
                      <span className="engineer-info-icon">{getCategoryIcon(complaint.category)}</span> Category: {complaint.category}
                    </p>
                    <button className="engineer-view-details-btn" onClick={() => handleViewDetails(complaint)}>
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
              <div className="engineer-complaint-actions">
                <button className="engineer-action-btn engineer-reject-btn" onClick={() => handleRejectComplaint(complaint)}>
                  Reject
                </button>
                <button className="engineer-action-btn engineer-accept-btn" onClick={() => handleAcceptComplaint(complaint)}>
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewComplaints;
