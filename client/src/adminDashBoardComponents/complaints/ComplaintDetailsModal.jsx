import React, { useState } from "react";
import "../../styles/ComplaintDetailsModal.css";

const ComplaintDetailsModal = ({ complaint, onClose, onAssignEngineer }) => {
  const [activeTab, setActiveTab] = useState("details");

  // Format date to readable string
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Sample timeline data (replace with actual data when available)
  const timelineEvents = [
    {
      date: complaint.dateSubmitted,
      status: "Submitted",
      description: "Complaint submitted by user",
    },
    ...(complaint.assignedTo
      ? [
          {
            date: complaint.dateAssigned,
            status: "Assigned",
            description: `Assigned to ${complaint.assignedTo.name}`,
          },
        ]
      : []),
    ...(complaint.status === "In Progress"
      ? [
          {
            date: complaint.dateStarted,
            status: "In Progress",
            description: "Work started on complaint",
          },
        ]
      : []),
    ...(complaint.status === "Completed"
      ? [
          {
            date: complaint.dateCompleted,
            status: "Completed",
            description: "Complaint resolved",
          },
        ]
      : []),
  ].filter((event) => event.date); // Filter out events without dates
  console.log('Complaints from all complaints',complaint);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Complaint {complaint.id}</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-button ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`tab-button ${activeTab === "timeline" ? "active" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            Timeline
          </button>
          {complaint.feedback && (
            <button
              className={`tab-button ${
                activeTab === "feedback" ? "active" : ""
              }`}
              onClick={() => setActiveTab("feedback")}
            >
              Feedback
            </button>
          )}
        </div>

        <div className="modal-body">
          {activeTab === "details" && (
            <>
              <div className="complaint-header">
                <h3>{complaint.title}</h3>
                <span
                  className={`status-badge ${complaint.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {complaint.status}
                </span>
              </div>

              <div className="complaint-info-grid">
                <div className="info-item">
                  <span className="info-label">Submitted By</span>
                  <span className="info-value">
                    {complaint.submitted_by || "Unknown"}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Category</span>
                  <span className="info-value category-badge">
                    {complaint.category}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Location</span>
                  <span className="info-value">{complaint.location}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Date Submitted</span>
                  <span className="info-value">
                    {formatDate(complaint.created_at)}
                  </span>
                </div>
                {complaint.assignedTo && (
                  <div className="info-item">
                    <span className="info-label">Assigned To</span>
                    <span className="info-value">
                      {complaint.assignedTo.name}
                    </span>
                  </div>
                )}
                {complaint.priority && (
                  <div className="info-item">
                    <span className="info-label">Priority</span>
                    <span
                      className={`info-value priority-badge ${complaint.priority.toLowerCase()}`}
                    >
                      {complaint.priority}
                    </span>
                  </div>
                )}
              </div>

              <div className="complaint-description">
                <h4>Description</h4>
                <p>{complaint.description}</p>
              </div>

              {complaint.images && complaint.images.length > 0 && (
                <div className="complaint-images">
                  <h4>Images</h4>
                  <div className="image-gallery">
                    {complaint.images.map((image, index) => (
                      <div className="image-container" key={index}>
                        <img
                          src={image.url}
                          alt={`Complaint ${complaint.id} - Image ${index + 1}`}
                          onClick={() => window.open(image.url, "_blank")}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "timeline" && (
            <div className="timeline-container">
              {timelineEvents.length > 0 ? (
                <div className="timeline">
                  {timelineEvents.map((event, index) => (
                    <div className="timeline-item" key={index}>
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <h4>{event.status}</h4>
                        <p className="timeline-date">
                          {formatDate(event.date)}
                        </p>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-timeline">
                  <p>No timeline events available</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "feedback" && complaint.feedback && (
            <div className="feedback-container">
              <div className="rating-display">
                <h4>User Rating</h4>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${
                        star <= complaint.feedback.rating ? "filled" : ""
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="rating-value">
                    {complaint.feedback.rating}/5
                  </span>
                </div>
              </div>
              <div className="feedback-comment">
                <h4>User Comments</h4>
                <p>{complaint.feedback.comments || "No comments provided."}</p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          {complaint.status === "Pending" && (
            <button
              className="btn primary-btn"
              onClick={() => {
                onAssignEngineer(complaint.id);
                onClose();
              }}
            >
              Assign Engineer
            </button>
          )}
          <button className="btn secondary-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
