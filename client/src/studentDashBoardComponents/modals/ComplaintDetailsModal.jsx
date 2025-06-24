import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaExclamationCircle,
  FaStar,
  FaUserCircle,
  FaComments,
  FaClock,
  FaCheckCircle,
  FaHistory,
  FaFileAlt,
  FaHome,
} from "react-icons/fa";
import "../../styles/StudentComplaintDetailsModal.css";

const ComplaintDetailsModal = ({ isVisible, complaint, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  // Handle graceful closing animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) handleClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!isVisible || !complaint) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };


  // Calculate time elapsed since complaint creation
  const getTimeElapsed = (dateString) => {
    const created = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else {
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div
      className={`student-complaint-modal-overlay ${
        isClosing ? "student-complaint-modal-closing" : ""
      }`}
      onClick={handleClose}
    >
      <div
        className={`student-complaint-modal-content ${
          isClosing ? "student-complaint-modal-content-closing" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Blue header bar like in the screenshot */}
        <div className="student-complaint-modal-header">
          <div className="student-complaint-modal-header-left">
            <h2 className="student-complaint-modal-title">
              Complaint #{complaint.id} - {complaint.category}
            </h2>
          </div>
          <button
            className="student-complaint-modal-close-btn"
            onClick={handleClose}
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

        {/* Tab-like navigation bar */}
        <div className="student-complaint-modal-tabs">
          <div className="student-complaint-modal-tab active">
            <FaFileAlt />
            Details
          </div>

          
        </div>

        <div className="student-complaint-modal-body">
          <div className="student-complaint-modal-section">
            <h3>Complaint Information</h3>

            <div>
              <div className="student-complaint-modal-info-row">
                <div>Description</div>
                <div>{complaint.description}</div>
              </div>

              <div className="student-complaint-modal-info-row">
                <div>Location</div>
                <div>
                  <div className="student-complaint-modal-location-info">
                    <FaMapMarkerAlt className="student-complaint-modal-icon-small" />{" "}
                    {complaint.location}
                  </div>
                  {complaint.roomNumber && (
                    <div className="student-complaint-modal-location-info">
                      <FaHome className="student-complaint-modal-icon-small" />{" "}
                      Room: {complaint.roomNumber || "101"}
                    </div>
                  )}
                </div>
              </div>

              <div className="student-complaint-modal-info-row">
                <div>Category</div>
                <div>
                  <span className="student-complaint-modal-category-badge">
                    {complaint.category}
                  </span>
                </div>
              </div>

              <div className="student-complaint-modal-info-row">
                <div>Priority</div>
                <div>
                  <span
                    className={`student-complaint-modal-priority-badge ${complaint.priority.toLowerCase()}`}
                  >
                    {complaint.priority}
                  </span>
                </div>
              </div>

              <div className="student-complaint-modal-info-row">
                <div>Status</div>
                <div>
                  <span
                    className={`student-complaint-modal-status-badge ${
                      complaint.status === "In Progress"
                        ? "inprogress"
                        : complaint.status.toLowerCase()
                    }`}
                  >
                    {complaint.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="student-complaint-modal-section">
            <h3>Submission Details</h3>

            <div>
              <div className="student-complaint-modal-info-row">
                <div>Submitted By</div>
                <div className="student-complaint-modal-user-info">
                  <div className="student-complaint-modal-avatar">
                    <FaUserCircle className="student-complaint-modal-user-icon" />
                  </div>
                  {complaint.submitted_by || "Student ID"}
                </div>
              </div>

              <div className="student-complaint-modal-info-row">
                <div>Date Submitted</div>
                <div className="student-complaint-modal-user-info">
                  <FaCalendarAlt className="student-complaint-modal-icon-small" />
                  {formatDate(complaint.created_at)}
                </div>
              </div>
            </div>
          </div>

          

          <div className="student-complaint-modal-info-grid">
            <div className="student-complaint-modal-info-card">
              <div className="student-complaint-modal-info-icon">
                <FaCalendarAlt />
              </div>
              <div className="student-complaint-modal-info-content">
                <span className="student-complaint-modal-info-label">
                  Submitted On
                </span>
                <span className="student-complaint-modal-info-value">
                  {formatDate(complaint.created_at)}
                </span>
              </div>
            </div>

            <div className="student-complaint-modal-info-card">
              <div className="student-complaint-modal-info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="student-complaint-modal-info-content">
                <span className="student-complaint-modal-info-label">
                  Location
                </span>
                <span className="student-complaint-modal-info-value">
                  {complaint.location}
                </span>
              </div>
            </div>

            <div className="student-complaint-modal-info-card">
              <div className="student-complaint-modal-info-icon">
                <FaTag />
              </div>
              <div className="student-complaint-modal-info-content">
                <span className="student-complaint-modal-info-label">
                  Category
                </span>
                <span className="student-complaint-modal-info-value">
                  {complaint.category}
                </span>
              </div>
            </div>

            <div className="student-complaint-modal-info-card">
              <div className="student-complaint-modal-info-icon">
                <FaExclamationCircle />
              </div>
              <div className="student-complaint-modal-info-content">
                <span className="student-complaint-modal-info-label">
                  Priority
                </span>
                <span
                  className={`student-complaint-modal-priority student-complaint-modal-priority-${complaint.priority.toLowerCase()}`}
                >
                  {complaint.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="student-complaint-modal-description-section">
            <h4 className="student-complaint-modal-section-title">
              <FaComments className="student-complaint-modal-section-icon" />
              Description
            </h4>
            <div className="student-complaint-modal-description-content">
              <p>{complaint.description}</p>
            </div>
          </div>

          {complaint.assignedTo && (
            <div className="student-complaint-modal-assigned-section">
              <h4 className="student-complaint-modal-section-title">
                <FaUserCircle className="student-complaint-modal-section-icon" />
                Assigned Engineer
              </h4>
              <div className="student-complaint-modal-engineer-info">
                <div className="student-complaint-modal-engineer-avatar">
                  <FaUserCircle />
                </div>
                <div className="student-complaint-modal-engineer-details">
                  <span className="student-complaint-modal-engineer-name">
                    {complaint.assignedTo}
                  </span>
                  <span className="student-complaint-modal-engineer-category">
                    {complaint.category} Specialist
                  </span>
                </div>
              </div>
            </div>
          )}

          {complaint.status === "Completed" && !complaint.feedback && (
            <div className="student-complaint-modal-reminder-section">
              <div className="student-complaint-modal-reminder-icon">
                <FaStar />
              </div>
              <div className="student-complaint-modal-reminder-text">
                <h5>Your feedback matters!</h5>
                <p>
                  Please consider providing feedback on this resolved complaint
                  from your dashboard.
                </p>
              </div>
            </div>
          )}

          {complaint.feedback && (
            <div className="student-complaint-modal-feedback-section">
              <h4 className="student-complaint-modal-section-title">
                <FaStar className="student-complaint-modal-section-icon" />
                Your Feedback
              </h4>
              <div className="student-complaint-modal-feedback-content">
                <div className="student-complaint-modal-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`student-complaint-modal-star ${
                        star <= complaint.rating
                          ? "student-complaint-modal-star-filled"
                          : ""
                      }`}
                    />
                  ))}
                  <span className="student-complaint-modal-rating-text">
                    {complaint.rating}/5
                  </span>
                </div>
                {complaint.feedback && (
                  <div className="student-complaint-modal-feedback-comment">
                    <p>{complaint.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {complaint.status === "Completed" && complaint.resolvedAt && (
            <div className="student-complaint-modal-resolution-info">
              <div className="student-complaint-modal-resolution-icon">
                <FaHistory />
              </div>
              <span>Resolved on {formatDate(complaint.resolvedAt)}</span>
            </div>
          )}
        </div>

        <div className="student-complaint-modal-footer">
          <button
            className="student-complaint-modal-close-button"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
