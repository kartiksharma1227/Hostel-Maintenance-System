// src/EngineerDashBoardComponents/UpdateModal.jsx
import React from "react";
import "../styles/EngineerDashboard.css";

const UpdateModal = ({
  updateModal,
  updateForm,
  handleUpdateFormChange,
  handleUpdateSubmit,
  setUpdateModal,
}) => {
  return (
    <div className="engineer-update-modal">
      <div className="engineer-update-modal-content">
        <div className="engineer-modal-header">
          <h3>Update Complaint</h3>
          <button
            className="engineer-close-modal-btn"
            onClick={() => setUpdateModal({ visible: false, complaintId: null })}
          >
            ✖
          </button>
        </div>
        <form onSubmit={handleUpdateSubmit} className="engineer-update-form">
          <div className="engineer-form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={updateForm.status}
              onChange={handleUpdateFormChange}
              required
              className="engineer-select-enhanced"
            >
              <option value="">Select status</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <div className="engineer-form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={updateForm.description}
              onChange={handleUpdateFormChange}
              required
              rows="4"
              placeholder="Enter description"
              className="engineer-textarea-enhanced"
            />
          </div>
          <div className="engineer-form-actions">
            <button
              type="button"
              className="engineer-cancel-btn"
              onClick={() => setUpdateModal({ visible: false, complaintId: null })}
            >
              Cancel
            </button>
            <button type="submit" className="engineer-submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
