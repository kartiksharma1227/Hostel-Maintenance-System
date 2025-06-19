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
        className={`status-badge ${status.toLowerCase().replace(" ", "-")}`}
      >
        {status}
      </span>
    );
  };
  console.log(complaint);
  // Tabs rendering function
  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="complaint-details-content">
            <div className="detail-row">
              <div className="detail-label">Description</div>
              <div className="detail-value">{complaint.description}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Location</div>
              <div className="detail-value">{complaint.location}</div>
              <div className="detail-value">Room: {complaint.room_FK
}</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Category</div>
              <div className="detail-value">
                <span className="category-badge">{complaint.category}</span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Priority</div>
              <div className="detail-value">
                <span
                  className={`priority-badge ${
                    complaint.priority?.toLowerCase() || "medium"
                  }`}
                >
                  {complaint.priority || "Medium"}
                </span>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Status</div>
              <div className="detail-value">
                {renderStatusBadge(complaint.status)}
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Submitted By</div>
              <div className="detail-value">
                <div className="submitter-info">
                  <div className="submitter-name">
                    {complaint.submitted_by || "Unknown"}
                  </div>
                  {/* <div className="submitter-email">
                    {complaint.submittedBy?.email || "N/A"}
                  </div> */}
                  {/* <div className="submitter-phone">
                    Phone: {complaint.submittedBy?.phone || "N/A"}
                  </div> */}
                </div>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-label">Date Submitted</div>
              <div className="detail-value">
                {formatDate(complaint.created_at)}
              </div>
            </div>

            {complaint.engineer_name && (
              <div className="detail-row engineer-details">
                <div className="detail-label">Assigned Engineer</div>
                <div className="detail-value">
                  <div className="engineer-info">
                    <div className="engineer-avatar">
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
                    <div className="engineer-details-container">
                      <div className="engineer-name">
                        {complaint.engineer_name || "Unknown"}
                      </div>
                      {/* <div className="engineer-specialization">
                        {complaint.assignedEngineer.specialization || "N/A"}
                      </div> */}
                      <div className="engineer-contact">
                        {/* <span>{complaint.assignedEngineer.email || "N/A"}</span> */}
                        <span>{complaint.engineer_phone|| "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {complaint.admin_name && (
              <div className="detail-row admin-details">
                <div className="detail-label">Admin Details</div>
                <div className="detail-value">
                  <div className="admin-info">
                    <div className="admin-avatar">
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
                    <div className="admin-details-container">
                      <div className="admin-name">
                        {complaint.admin_name|| "Unknown"}
                      </div>
                      {/* <div className="admin-role">
                        {complaint.adminDetails.role || "Administrator"}
                      </div> */}
                      <div className="admin-contact">
                        {/* <span>{complaint.adminDetails.email || "N/A"}</span> */}
                        <span>{complaint.admin_phone|| "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {complaint.images && complaint.images.length > 0 && (
              <div className="detail-row">
                <div className="detail-label">Attachments</div>
                <div className="detail-value">
                  <div className="attachments-gallery">
                    {complaint.images.map((image, index) => (
                      <div key={index} className="attachment-thumbnail">
                        <img src={image} alt={`Attachment ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {complaint.dateCompleted && (
              <div className="detail-row">
                <div className="detail-label">Date Completed</div>
                <div className="detail-value">
                  {formatDate(complaint.dateCompleted)}
                </div>
              </div>
            )}

            {complaint.resolutionNotes && (
              <div className="detail-row">
                <div className="detail-label">Resolution Notes</div>
                <div className="detail-value resolution-notes">
                  {complaint.resolutionNotes}
                </div>
              </div>
            )}
          </div>
        );

      case "followups":
        return (
          <div className="complaint-followups-content">
            {complaint.followups && complaint.followups.length > 0 ? (
              <div className="followups-list">
                {complaint.followups.map((followup, index) => (
                  <div key={index} className="followup-item">
                    <div className="followup-header">
                      <div className="followup-date">
                        {formatDate(followup.date)}
                      </div>
                      {followup.type && (
                        <div className="followup-type">{followup.type}</div>
                      )}
                    </div>
                    <div className="followup-body">
                      <p>{followup.description}</p>
                      {followup.attachments &&
                        followup.attachments.length > 0 && (
                          <div className="followup-attachments">
                            {followup.attachments.map((attachment, i) => (
                              <div key={i} className="attachment-item">
                                <span className="attachment-name">
                                  {attachment}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                    {followup.actionTaken && (
                      <div className="followup-action">
                        <span className="action-tag">
                          {followup.actionTaken}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-followups">
                <div className="no-data-icon">
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
                <p>No follow-ups available for this complaint</p>
              </div>
            )}
          </div>
        );

      case "revisits":
        return (
          <div className="complaint-revisits-content">
            {complaint.revisits && complaint.revisits.length > 0 ? (
              <div className="revisits-list">
                {complaint.revisits.map((revisit, index) => (
                  <div key={index} className="revisit-item">
                    <div className="revisit-header">
                      <div className="revisit-date">
                        <strong>Visit Date:</strong> {formatDate(revisit.date)}
                      </div>
                      <div className="revisit-engineer">
                        <strong>Engineer:</strong>{" "}
                        {revisit.engineer?.name ||
                          complaint.assignedEngineer?.name ||
                          "Not assigned"}
                      </div>
                    </div>

                    <div className="revisit-work">
                      <h6>Work Performed</h6>
                      <p>{revisit.workPerformed || "No details provided"}</p>

                      {revisit.partsReplaced &&
                        revisit.partsReplaced.length > 0 && (
                          <div className="parts-replaced">
                            <h6>Parts Replaced</h6>
                            <div className="parts-list">
                              {revisit.partsReplaced.map((part, i) => (
                                <div key={i} className="part-item">
                                  <span className="part-name">{part}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>

                    {revisit.images && revisit.images.length > 0 && (
                      <div className="revisit-images">
                        <h6>Images</h6>
                        <div className="images-gallery">
                          {revisit.images.map((image, i) => (
                            <div key={i} className="gallery-item">
                              <img src={image} alt={`Visit image ${i + 1}`} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="revisit-status">
                      <span className="status-label">Outcome:</span>
                      <span
                        className={`revisit-outcome ${
                          revisit.outcome?.toLowerCase().replace(" ", "-") ||
                          "diagnosed"
                        }`}
                      >
                        {revisit.outcome || "Diagnosed"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-revisits">
                <div className="no-data-icon">
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
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <p>No revisits recorded for this complaint</p>
              </div>
            )}
          </div>
        );

      case "feedback":
        // Only show feedback if the complaint is completed
        if (complaint.status !== "Completed") {
          return (
            <div className="no-feedback">
              <div className="no-data-icon">
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
              <p>Feedback will be available once the complaint is completed</p>
            </div>
          );
        }

        return (
          <div className="complaint-feedback-content">
            {complaint.feedback_text ? (
              <div className="feedback-details">
                <div className="detail-row">
                  <div className="detail-label">Rating</div>
                  <div className="detail-value">
                    <div className="rating-stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            star <= complaint.feedback_rating ? "filled" : ""
                          }`}
                        >
                          ★
                        </span>
                      ))}
                      <span className="rating-number">
                        ({complaint.feedback_rating}/5)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">Comments</div>
                  <div className="detail-value">
                    {complaint.feedback_text || "No comments provided"}
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-label">Submitted On</div>
                  <div className="detail-value">
                    {formatDate(complaint.feedback_created_at)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="no-feedback">
                <div className="no-data-icon">
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
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content complaint-details-modal">
        <div className="modal-header">
          <h2>
            Complaint #{complaint.id} - {complaint.title}
          </h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            className={`tab-btn ${activeTab === "followups" ? "active" : ""}`}
            onClick={() => setActiveTab("followups")}
          >
            Follow-ups
          </button>
          <button
            className={`tab-btn ${activeTab === "revisits" ? "active" : ""}`}
            onClick={() => setActiveTab("revisits")}
          >
            Revisits
          </button>
          <button
            className={`tab-btn ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            Feedback
          </button>
        </div>

        <div className="modal-body">{renderTabContent()}</div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsModal;
