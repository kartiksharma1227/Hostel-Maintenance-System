import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmationModal = ({
  isVisible,
  complaintId,
  onClose,
  onConfirm,
}) => {
  if (!isVisible) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-content">
        <span className="confirmation-icon">
          <FaExclamationTriangle />
        </span>
        <h3>Cancel Complaint</h3>
        <p>
          Are you sure you want to cancel this complaint? This action cannot be
          undone.
        </p>

        <div className="confirmation-actions">
          <button className="cancel-action-btn" onClick={onClose}>
            Keep Complaint
          </button>
          <button
            className="confirm-action-btn"
            onClick={() => onConfirm(complaintId)}
          >
            Yes, Cancel It
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
