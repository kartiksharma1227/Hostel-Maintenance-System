import React, { useState } from "react";
import "../../styles/ViewEngineerModal.css";
const ViewEngineerModal = ({ engineer, onClose }) => {
  const [activeTab, setActiveTab] = useState("basic");

  return (
    <div className="adminengineer-modal-overlay">
      <div className="adminengineer-modal-content">
        <div className="adminengineer-modal-header">
          <h2>Engineer Profile - {engineer.fullName}</h2>
          <button className="adminengineer-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="adminengineer-modal-tabs">
          <button
            className={`adminengineer-tab-btn ${activeTab === "basic" ? "active" : ""}`}
            onClick={() => setActiveTab("basic")}
          >
            Basic Profile
          </button>
          <button
            className={`adminengineer-tab-btn ${activeTab === "professional" ? "active" : ""}`}
            onClick={() => setActiveTab("professional")}
          >
            Professional Details
          </button>
        </div>

        <div className="adminengineer-modal-body">
          {activeTab === "basic" ? (
            <div className="adminengineer-basic-profile">
              <div className="adminengineer-info-row">
                <span className="adminengineer-label">Full Name:</span>
                <span className="adminengineer-value">{engineer.fullName}</span>
              </div>
              <div className="adminengineer-info-row">
                <span className="adminengineer-label">Email:</span>
                <span className="adminengineer-value">{engineer.email}</span>
              </div>
              <div className="adminengineer-info-row">
                <span className="adminengineer-label">Phone Number:</span>
                <span className="adminengineer-value">{engineer.phoneNumber}</span>
              </div>
              
              <div className="adminengineer-info-row">
                <span className="adminengineer-label">Address:</span>
                <span className="adminengineer-value">{engineer.address}</span>
              </div>
              <div className="adminengineer-info-row">
                <span className="adminengineer-label">Availability Status:</span>
                <span className="adminengineer-value">
                  {engineer.isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>
          ) : (
            <div className="adminengineer-professional-details">
              <div className="adminengineer-info-row">
                <span className="adminengineer-label">Specialization:</span>
                <span className="adminengineer-value">{engineer.specialization}</span>
              </div>
              <div className="adminengineer-info-row">
                <span className="adminengineer-label">Years of Experience:</span>
                <span className="adminengineer-value">{engineer.yearsOfExperience}</span>
              </div>
              
            </div>
          )}
        </div>

        <div className="adminengineer-modal-footer">
          <button className="adminengineer-btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEngineerModal;
