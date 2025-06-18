import React, { useState } from "react";

const AssignComplaintModal = ({ complaint, engineers, onAssign, onClose }) => {
  const [selectedEngineerId, setSelectedEngineerId] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAssign({
      complaintId: complaint.id,
      engineerId: selectedEngineerId,
      note: note,
    });
    onClose();
  };

  const filteredEngineers = engineers.filter(
    (engineer) => engineer.specialization === complaint.category
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Assign Engineer</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="complaint-summary">
              <h4>Complaint {complaint.id}</h4>
              <p>{complaint.title}</p>
            </div>

            <div className="form-group">
              <label htmlFor="engineer">
                <span className="label-text">Select Engineer</span>
                <span className="required-badge">Required</span>
              </label>
              {/* <select
                id="engineer"
                value={selectedEngineerId}
                onChange={(e) => setSelectedEngineerId(e.target.value)}
                required
                className="select-enhanced"
              >
                <option value="">Choose an engineer</option>
                {filteredEngineers.map((engineer) => (
                  <option key={engineer.id} value={engineer.id}>
                    {engineer.name} - {engineer.specialization}(
                    {engineer.assignedComplaints} active tasks)
                  </option>
                ))}
              </select> */}
              
              <select
                id="engineer"
                value={selectedEngineerId}
                
                onChange={(e) => setSelectedEngineerId(Number(e.target.value))} // Convert to number
                required
                className="select-enhanced"
              >
                {/* console.log(selectedEngineerId); */}
                <option value="">Choose an engineer</option>
                {filteredEngineers.map((engineer) => (
                  <option key={engineer.user_FK} value={engineer.user_FK}>
                    {engineer.name} - {engineer.specialization} (
                    {engineer.assignedComplaints || 0} active tasks)
                  </option>
                ))}
              </select>

              {filteredEngineers.length === 0 && (
                <p className="no-engineers-warning">
                  No engineers available for {complaint.category} category
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="note">
                <span className="label-text">Assignment Note</span>
                <span className="optional-badge">Optional</span>
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any special instructions or notes for the engineer..."
                className="textarea-enhanced"
                rows="3"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primary-btn"
              disabled={!selectedEngineerId}
            >
              Assign Engineer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignComplaintModal;
