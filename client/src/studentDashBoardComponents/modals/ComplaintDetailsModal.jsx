import React from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTag,
  FaExclamationCircle,
  FaStar,
} from "react-icons/fa";

const ComplaintDetailsModal = ({ isVisible, complaint, onClose }) => {
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

  return (
    <div className="details-modal">
      <div className="details-modal-content premium">
        <div className="modal-top-accent" />
        <div className="modal-backdrop" />

        <div className="details-header">
          <div className="header-left">
            <div className="detail-category-icon">
              <FaTag />
            </div>
            <h3>Complaint Details</h3>
          </div>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="complaint-detail-info">
          <div className="detail-main-header">
            <span className="detail-id-badge">#{complaint.id}</span>
            <h2 className="detail-title">{complaint.title}</h2>
            <span className={`status-badge ${complaint.status}`}>
              {complaint.status}
            </span>
          </div>

          <div className="detail-meta-cards">
            <div className="meta-card">
              <div className="meta-card-icon">
                <FaCalendarAlt />
              </div>
              <div className="meta-card-content">
                <span className="meta-card-label">Submitted On</span>
                <span className="meta-card-value">
                  {formatDate(complaint.createdAt)}
                </span>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-card-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="meta-card-content">
                <span className="meta-card-label">Location</span>
                <span className="meta-card-value">{complaint.location}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-card-icon">
                <FaTag />
              </div>
              <div className="meta-card-content">
                <span className="meta-card-label">Category</span>
                <span className="meta-card-value">{complaint.category}</span>
              </div>
            </div>

            <div className="meta-card">
              <div className="meta-card-icon">
                <FaExclamationCircle />
              </div>
              <div className="meta-card-content">
                <span className="meta-card-label">Priority</span>
                <span className={`priority-indicator ${complaint.priority}`}>
                  {complaint.priority}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-description-card">
            <h4 className="section-title">
              <FaTag className="section-icon" />
              Description
            </h4>
            <div className="description-content">
              <p>{complaint.description}</p>
            </div>
          </div>

          {complaint.feedback && (
            <div className="detail-feedback-card">
              <h4 className="section-title">Feedback</h4>
              <div className="feedback-card-content">
                <div className="feedback-stars-display">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`rating-star ${
                        star <= complaint.rating ? "filled" : ""
                      }`}
                    />
                  ))}
                  <span className="rating-text">{complaint.rating}/5</span>
                </div>
                {complaint.feedback && (
                  <div className="feedback-comment-box">
                    <p>{complaint.feedback}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="details-footer">
          <button className="close-details-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
