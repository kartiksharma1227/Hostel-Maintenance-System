import React, { useState } from "react";
import "../../styles/ComplaintDetailsModal.css";

const ComplaintDetailsModal = ({ complaint, onClose }) => {
  const [activeTab, setActiveTab] = useState("details");

  if (!complaint) return null;

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

  // Function to render the complaint status badge
  const renderStatusBadge = (status) => {
    return (
      <span
        className={`complaints-modal-status-badge complaints-modal-${status
          .toLowerCase()
          .replace(" ", "-")}`}
      >
        {status}
      </span>
    );
  };

  // Tabs rendering function
  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="complaints-modal-details-content">
            <div className="complaints-modal-section">
              <div className="complaints-modal-section-title">
                Complaint Information
              </div>
              <div className="complaints-modal-detail-row">
                <div className="complaints-modal-detail-label">Description</div>
                <div className="complaints-modal-detail-value">
                  {complaint.description}
                </div>
              </div>

              <div className="complaints-modal-detail-row">
                <div className="complaints-modal-detail-label">Location</div>
                <div className="complaints-modal-detail-value">
                  <div className="complaints-modal-location-info">
                    <span className="complaints-modal-location-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </span>
                    {complaint.location}
                  </div>
                  <div className="complaints-modal-room-info">
                    <span className="complaints-modal-room-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                    </span>
                    Room: {complaint.room_FK}
                  </div>
                </div>
              </div>

              <div className="complaints-modal-detail-row">
                <div className="complaints-modal-detail-label">Category</div>
                <div className="complaints-modal-detail-value">
                  <span className="complaints-modal-category-badge">
                    {complaint.category}
                  </span>
                </div>
              </div>

              <div className="complaints-modal-detail-row">
                <div className="complaints-modal-detail-label">Priority</div>
                <div className="complaints-modal-detail-value">
                  <span
                    className={`complaints-modal-priority-badge complaints-modal-${
                      complaint.priority?.toLowerCase() || "medium"
                    }`}
                  >
                    {complaint.priority || "Medium"}
                  </span>
                </div>
              </div>

              <div className="complaints-modal-detail-row">
                <div className="complaints-modal-detail-label">Status</div>
                <div className="complaints-modal-detail-value">
                  {renderStatusBadge(complaint.status)}
                </div>
              </div>
            </div>

            <div className="complaints-modal-section">
              <div className="complaints-modal-section-title">
                Submission Details
              </div>
              <div className="complaints-modal-detail-row">
                <div className="complaints-modal-detail-label">
                  Submitted By
                </div>
                <div className="complaints-modal-detail-value">
                  <div className="complaints-modal-submitter-info">
                    <div className="complaints-modal-submitter-avatar">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="complaints-modal-submitter-name">
                      {complaint.submitted_by || "Unknown"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="complaints-modal-detail-row">
                <div className="complaints-modal-detail-label">
                  Date Submitted
                </div>
                <div className="complaints-modal-detail-value">
                  <div className="complaints-modal-date-info">
                    <span className="complaints-modal-date-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                    </span>
                    {formatDate(complaint.created_at)}
                  </div>
                </div>
              </div>
            </div>

            {complaint.engineer_name && (
              <div className="complaints-modal-section">
                <div className="complaints-modal-section-title">
                  Assignment Information
                </div>
                <div className="complaints-modal-detail-row complaints-modal-engineer-details">
                  <div className="complaints-modal-detail-label">
                    Assigned Engineer
                  </div>
                  <div className="complaints-modal-detail-value">
                    <div className="complaints-modal-engineer-info">
                      <div className="complaints-modal-engineer-avatar">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                      <div className="complaints-modal-engineer-details-container">
                        <div className="complaints-modal-engineer-name">
                          {complaint.engineer_name || "Unknown"}
                        </div>
                        <div className="complaints-modal-engineer-contact">
                          <span className="complaints-modal-phone-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                          </span>
                          {complaint.engineer_phone || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {complaint.admin_name && (
              <div className="complaints-modal-section">
                <div className="complaints-modal-detail-row complaints-modal-admin-details">
                  <div className="complaints-modal-detail-label">
                    Admin Details
                  </div>
                  <div className="complaints-modal-detail-value">
                    <div className="complaints-modal-admin-info">
                      <div className="complaints-modal-admin-avatar">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                          <circle cx="8.5" cy="7" r="4"></circle>
                          <line x1="20" y1="8" x2="20" y2="14"></line>
                          <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                      </div>
                      <div className="complaints-modal-admin-details-container">
                        <div className="complaints-modal-admin-name">
                          {complaint.admin_name || "Unknown"}
                        </div>
                        <div className="complaints-modal-admin-contact">
                          <span className="complaints-modal-phone-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                            </svg>
                          </span>
                          {complaint.admin_phone || "N/A"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {complaint.images && complaint.images.length > 0 && (
              <div className="complaints-modal-section">
                <div className="complaints-modal-section-title">
                  Attachments
                </div>
                <div className="complaints-modal-detail-row">
                  <div className="complaints-modal-detail-value complaints-modal-full-width">
                    <div className="complaints-modal-attachments-gallery">
                      {complaint.images.map((image, index) => (
                        <div
                          key={index}
                          className="complaints-modal-attachment-thumbnail"
                        >
                          <img src={image} alt={`Attachment ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {complaint.dateCompleted && (
              <div className="complaints-modal-section">
                <div className="complaints-modal-detail-row">
                  <div className="complaints-modal-detail-label">
                    Date Completed
                  </div>
                  <div className="complaints-modal-detail-value">
                    <div className="complaints-modal-date-info">
                      <span className="complaints-modal-date-icon complaints-modal-success-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </span>
                      {formatDate(complaint.dateCompleted)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {complaint.resolutionNotes && (
              <div className="complaints-modal-section">
                <div className="complaints-modal-section-title">
                  Resolution Information
                </div>
                <div className="complaints-modal-detail-row">
                  <div className="complaints-modal-detail-label">
                    Resolution Notes
                  </div>
                  <div className="complaints-modal-detail-value complaints-modal-resolution-notes">
                    {complaint.resolutionNotes}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "followups":
        return (
          <div className="complaints-modal-followups-content">
            {complaint.followups && complaint.followups.length > 0 ? (
              complaint.followups.map((f, index) => (
                <div key={index} className="complaints-modal-followup-card">
                  <div className="complaints-modal-followup-header">
                    <div className="complaints-modal-followup-visit-type">
                      <span className="complaints-modal-visit-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </span>
                      <strong>Visit Type:</strong> {f.visit_type}
                    </div>
                    <div className="complaints-modal-followup-date">
                      <span className="complaints-modal-date-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="3"
                            y="4"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </span>
                      <strong>Date:</strong>{" "}
                      {formatDate(f.visit_date)}
                    </div>
                  </div>
                  <div className="complaints-modal-followup-body">
                    <div className="complaints-modal-detail-row">
                      <div className="complaints-modal-detail-label">
                        Work Done:
                      </div>
                      <div className="complaints-modal-detail-value complaints-modal-work-done">
                        {f.work_done || "Not specified"}
                      </div>
                    </div>
                    {f.parts_replaced && (
                      <div className="complaints-modal-detail-row">
                        <div className="complaints-modal-detail-label">
                          Parts Replaced:
                        </div>
                        <div className="complaints-modal-detail-value">
                          <div className="complaints-modal-parts-container">
                            {f.parts_replaced.split(",").map((part, i) => (
                              <div
                                key={i}
                                className="complaints-modal-part-tag"
                              >
                                {part.trim()}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="complaints-modal-no-followups">
                <div className="complaints-modal-empty-state">
                  <div className="complaints-modal-empty-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                    </svg>
                  </div>
                  <p>No follow-ups recorded for this complaint.</p>
                </div>
              </div>
            )}
          </div>
        );

      case "feedback":
        // Only show feedback if the complaint is completed
        if (complaint.status !== "Completed") {
          return (
            <div className="complaints-modal-no-feedback">
              <div className="complaints-modal-empty-state">
                <div className="complaints-modal-empty-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <p>
                  Feedback will be available once the complaint is completed
                </p>
              </div>
            </div>
          );
        }

        return (
          <div className="complaints-modal-feedback-content">
            {complaint.feedback_rating ? (
              <div className="complaints-modal-feedback-details">
                <div className="complaints-modal-section">
                  <div className="complaints-modal-section-title">
                    Feedback Information
                  </div>
                  <div className="complaints-modal-detail-row">
                    <div className="complaints-modal-detail-label">Rating</div>
                    <div className="complaints-modal-detail-value">
                      <div className="complaints-modal-rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`complaints-modal-star ${
                              star <= complaint.feedback_rating
                                ? "complaints-modal-filled"
                                : ""
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="complaints-modal-rating-number">
                          ({complaint.feedback_rating}/5)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="complaints-modal-detail-row">
                    <div className="complaints-modal-detail-label">
                      Comments
                    </div>
                    <div className="complaints-modal-detail-value">
                      {complaint.feedback_text || "No comments provided"}
                    </div>
                  </div>

                  <div className="complaints-modal-detail-row">
                    <div className="complaints-modal-detail-label">
                      Submitted On
                    </div>
                    <div className="complaints-modal-detail-value">
                      <div className="complaints-modal-date-info">
                        <span className="complaints-modal-date-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="4"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                        </span>
                        {formatDate(complaint.feedback_created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="complaints-modal-no-feedback">
                <div className="complaints-modal-empty-state">
                  <div className="complaints-modal-empty-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </div>
                  <p>No feedback has been submitted for this complaint yet</p>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="complaints-modal-overlay">
      <div className="complaints-modal-content complaints-modal-details-modal">
        <div className="complaints-modal-header">
          <h2>
            Complaint #{complaint.id} - {complaint.title}
          </h2>
          <button className="complaints-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="complaints-modal-tabs">
          <button
            className={`complaints-modal-tab-btn ${
              activeTab === "details" ? "complaints-modal-active" : ""
            }`}
            onClick={() => setActiveTab("details")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Details
          </button>
          <button
            className={`complaints-modal-tab-btn ${
              activeTab === "followups" ? "complaints-modal-active" : ""
            }`}
            onClick={() => setActiveTab("followups")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
            Follow-ups
          </button>

          <button
            className={`complaints-modal-tab-btn ${
              activeTab === "feedback" ? "complaints-modal-active" : ""
            }`}
            onClick={() => setActiveTab("feedback")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            Feedback
          </button>
        </div>

        <div className="complaints-modal-body">{renderTabContent()}</div>

        <div className="complaints-modal-footer">
          <button
            className="complaints-modal-btn complaints-modal-btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
