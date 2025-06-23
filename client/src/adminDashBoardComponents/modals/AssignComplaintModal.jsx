import React, { useState } from "react";
import "../../styles/AssignComplaintModal.css";

const AssignComplaintModal = ({ complaint, engineers, onAssign, onClose }) => {
  const [selectedEngineerId, setSelectedEngineerId] = useState("");
  const [note, setNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("dropdown"); // "dropdown" or "list"

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    onAssign({
      complaintId: complaint.id,
      engineerId: selectedEngineerId,
      note: note,
    });
    // Note: onClose will be called by the parent component after the assignment is complete
  };

  const filteredEngineers = engineers.filter(
    (engineer) => engineer.specialization === complaint.category
  );

  // Determine workload level for engineers
  const getWorkloadLevel = (assignedComplaints) => {
    const count = assignedComplaints || 0;
    if (count < 3) return "low";
    if (count < 6) return "medium";
    return "high";
  };

  // Get label for workload
  const getWorkloadLabel = (level) => {
    switch (level) {
      case "low":
        return "Light";
      case "medium":
        return "Moderate";
      case "high":
        return "Heavy";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="assign-complaints-modal-overlay">
      <div className="assign-complaints-modal-content">
        <div className="assign-complaints-modal-header">
          <h3>Assign Engineer</h3>
          <button
            className="assign-complaints-modal-close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="assign-complaints-modal-body">
            <div className="assign-complaints-modal-complaint-summary">
              <h4>Complaint #{complaint.id}</h4>
              <p>
                <strong>Title:</strong> {complaint.title}
              </p>
              <p>
                <strong>Category:</strong> {complaint.category}
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(complaint.created_at).toLocaleString()}
              </p>
            </div>

            {filteredEngineers.length > 0 ? (
              <>
                <div className="assign-complaints-modal-view-toggle">
                  <button
                    type="button"
                    className={`assign-complaints-modal-view-btn ${
                      viewMode === "dropdown" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("dropdown")}
                  >
                    Dropdown View
                  </button>
                  <button
                    type="button"
                    className={`assign-complaints-modal-view-btn ${
                      viewMode === "list" ? "active" : ""
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    List View
                  </button>
                </div>

                {viewMode === "dropdown" ? (
                  <div className="assign-complaints-modal-form-group">
                    <label htmlFor="engineer">
                      <span className="assign-complaints-modal-label-text">
                        Select Engineer
                      </span>
                      <span className="assign-complaints-modal-required-badge">
                        Required
                      </span>
                    </label>

                    <select
                      id="engineer"
                      value={selectedEngineerId}
                      onChange={(e) =>
                        setSelectedEngineerId(Number(e.target.value))
                      }
                      required
                      className="assign-complaints-modal-select-enhanced"
                    >
                      <option value="">Choose an engineer</option>
                      {filteredEngineers.map((engineer) => {
                        const workloadLevel = getWorkloadLevel(
                          engineer.assignedComplaints
                        );
                        return (
                          <option
                            key={engineer.user_FK}
                            value={engineer.user_FK}
                          >
                            {engineer.name} - {engineer.specialization} 
                          </option>
                        );
                      })}
                    </select>
                  </div>
                ) : (
                  <div className="assign-complaints-modal-engineers-list">
                    <label>
                      <span className="assign-complaints-modal-label-text">
                        Select Engineer
                      </span>
                      <span className="assign-complaints-modal-required-badge">
                        Required
                      </span>
                    </label>

                    <div className="assign-complaints-modal-engineers-container">
                      {filteredEngineers.map((engineer) => {
                        const workloadLevel = getWorkloadLevel(
                          engineer.assignedComplaints
                        );
                        return (
                          <div
                            key={engineer.user_FK}
                            className={`assign-complaints-modal-engineer-item ${
                              selectedEngineerId === engineer.user_FK
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedEngineerId(engineer.user_FK)
                            }
                          >
                            <div className="assign-complaints-modal-engineer-details">
                              <div>
                                <div className="assign-complaints-modal-engineer-name">
                                  {engineer.name}
                                </div>
                                <div className="assign-complaints-modal-engineer-specialization">
                                  {engineer.specialization}
                                </div>
                              </div>
                              <div
                                className={`assign-complaints-modal-engineer-workload assign-complaints-modal-engineer-workload-${workloadLevel}`}
                              >
                                {getWorkloadLabel(workloadLevel)} (
                                {engineer.assignedComplaints || 0})
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <p className="assign-complaints-modal-no-engineers-warning">
                No engineers available for {complaint.category} category
              </p>
            )}

            <div className="assign-complaints-modal-form-group">
              <label htmlFor="note">
                <span className="assign-complaints-modal-label-text">
                  Assignment Note
                </span>
                <span className="assign-complaints-modal-optional-badge">
                  Optional
                </span>
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Add any special instructions or notes for the engineer..."
                className="assign-complaints-modal-textarea-enhanced"
                rows="3"
              />
            </div>
          </div>

          <div className="assign-complaints-modal-footer">
            <button
              type="button"
              className="assign-complaints-modal-secondary-btn"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="assign-complaints-modal-primary-btn"
              disabled={!selectedEngineerId || isLoading}
            >
              {isLoading ? "Assigning..." : "Assign Engineer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignComplaintModal;
