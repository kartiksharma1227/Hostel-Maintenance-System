// src/EngineerDashBoardComponents/DetailsModal.jsx
const DetailsModal = ({ selectedComplaint, closeDetailsModal }) => {
  return (
    <div className="engineer-details-modal-overlay" onClick={closeDetailsModal}>
      <div className="engineer-details-modal" onClick={(e) => e.stopPropagation()}>
        <div className="engineer-details-modal-header">
          <h3>Complaint Details</h3>
          <button className="engineer-modal-close-btn" onClick={closeDetailsModal}>
            ×
          </button>
        </div>
        <div className="engineer-details-modal-content">
          <div className="engineer-detail-item">
            <span className="engineer-detail-label">Complaint ID</span>
            <span className="engineer-detail-value">#{selectedComplaint.complaint_id}</span>
          </div>
          <div className="engineer-detail-item">
            <span className="engineer-detail-label">Title</span>
            <span className="engineer-detail-value">{selectedComplaint.title}</span>
          </div>
          <div className="engineer-detail-item">
            <span className="engineer-detail-label">Description</span>
            <span className="engineer-detail-value">{selectedComplaint.description}</span>
          </div>
          <div className="engineer-detail-item">
            <span className="engineer-detail-label">Location</span>
            <span className="engineer-detail-value">{selectedComplaint.location}</span>
          </div>
          {/* <div className="engineer-detail-item">
            <span className="engineer-detail-label">Date Reported</span>
            <span className="engineer-detail-value">{new Date(selectedComplaint.reportDate).toLocaleString()}</span>
          </div> */}
          <div className="engineer-detail-item">
            <span className="engineer-detail-label">Status</span>
            <span className={`engineer-detail-value engineer-status-badge`}>{selectedComplaint.status}</span>
          </div>
          {selectedComplaint.assignmentDate && (
            <div className="engineer-detail-item">
              <span className="engineer-detail-label">Assignment Date</span>
              <span className="engineer-detail-value">{selectedComplaint.assignmentDate}</span>
            </div>
          )}
          {selectedComplaint.priority && (
            <div className="engineer-detail-item">
              <span className="engineer-detail-label">Priority</span>
              <span className="engineer-detail-value">{selectedComplaint.priority}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
