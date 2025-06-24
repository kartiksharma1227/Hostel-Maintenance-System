// src/EngineerDashBoardComponents/DashboardOverview.jsx
import "../styles/UpcomingScheduledVisits.css"; // Import the new CSS file

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
const DashboardOverview = ({
  pendingComplaints,
  assignedComplaints,
  completedComplaints,
  scheduledVisits,
  handleViewDetails,
  handleOpenUpdateModal,
}) => {


  return (
    <div className="engineer-dashboard-overview">
      <h2>Engineer Dashboard</h2>
      <div className="engineer-stats-cards">
        <div className="engineer-stat-card">
          <h3>New Complaints</h3>
          <p className="engineer-stat-number">{assignedComplaints.length}</p>
          <span className="engineer-stat-icon">🔔</span>
        </div>
        <div className="engineer-stat-card">
          <h3>Assigned</h3>
          <p className="engineer-stat-number">{assignedComplaints.length}</p>
          <span className="engineer-stat-icon">📝</span>
        </div>
        <div className="engineer-stat-card">
          <h3>In Progress</h3>
          <p className="engineer-stat-number">
            {
              assignedComplaints.filter((c) => c.status === "In Progress")
                .length
            }
          </p>
          <span className="engineer-stat-icon">🔄</span>
        </div>
        <div className="engineer-stat-card">
          <h3>Completed</h3>
          <p className="engineer-stat-number">{completedComplaints.length}</p>
          <span className="engineer-stat-icon">✅</span>
        </div>
      </div>

      <div className="engineer-dashboard-sections">
        <div className="Upcoming-Scheduled-Visits-container">
          <h3 className="Upcoming-Scheduled-Visits-header">
            <span className="Upcoming-Scheduled-Visits-header-icon">📅</span>
            Upcoming Scheduled Visits
          </h3>
          {scheduledVisits.length === 0 ? (
            <div className="Upcoming-Scheduled-Visits-no-results">
              <div className="Upcoming-Scheduled-Visits-no-results-icon">
                📅
              </div>
              <p>No upcoming visits scheduled</p>
            </div>
          ) : (
            <div className="Upcoming-Scheduled-Visits-list">
              {scheduledVisits.map((visit) => (
                <div className="Upcoming-Scheduled-Visits-card" key={visit.id}>
                  <div className="Upcoming-Scheduled-Visits-date">
                    <div className="Upcoming-Scheduled-Visits-date-box">
                      <span className="Upcoming-Scheduled-Visits-month">
                        {new Date(visit.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                      <span className="Upcoming-Scheduled-Visits-day">
                        {new Date(visit.date).getDate()}
                      </span>
                    </div>
                    <span className="Upcoming-Scheduled-Visits-time">
                      {visit.time}
                    </span>
                  </div>
                  <div className="Upcoming-Scheduled-Visits-details">
                    <h4>{visit.title}</h4>
                    <p className="Upcoming-Scheduled-Visits-location">
                      <span className="Upcoming-Scheduled-Visits-location-icon">
                        📍
                      </span>
                      {visit.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="engineer-dashboard-section recent-assigned-complaints-section">
          <h3 className="recent-assigned-complaints-title">
            Recent Assigned Complaints
          </h3>
          {assignedComplaints.length === 0 ? (
            <div className="recent-assigned-complaints-empty">
              <div className="recent-assigned-complaints-empty-icon">📭</div>
              <p>No complaints assigned to you yet</p>
            </div>
          ) : (
            <div className="recent-assigned-complaints-container">
              {assignedComplaints.slice(0, 4).map((complaint) => (
                <div
                  className="recent-assigned-complaints-card"
                  key={complaint.id}
                >
                  <div className="recent-assigned-complaints-header">
                    <div className="recent-assigned-complaints-id-category">
                      <span className="recent-assigned-complaints-id">
                        #{complaint.id}
                      </span>
                      <span className="recent-assigned-complaints-category">
                        {complaint.category || "General"}
                      </span>
                    </div>
                    <span
                      className={`recent-assigned-complaints-status recent-assigned-complaints-status-${String(
                        complaint.status || ""
                      )
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </div>

                  <h4 className="recent-assigned-complaints-title">
                    {complaint.title}
                  </h4>
                  <p className="recent-assigned-complaints-description">
                    {(complaint.description || "").length > 100
                      ? `${(complaint.description || "").substring(0, 100)}...`
                      : complaint.description || ""}
                  </p>

                  <div className="recent-assigned-complaints-meta">
                    <div className="recent-assigned-complaints-location">
                      <span className="recent-assigned-complaints-icon">
                        📍
                      </span>
                      <span>{complaint.location}</span>
                    </div>
                    <div className="recent-assigned-complaints-date">
                      <span className="recent-assigned-complaints-icon">
                        🕒
                      </span>
                      <span>{formatDate(complaint.assigned_date)}</span>
                    </div>
                  </div>

                  <div className="recent-assigned-complaints-progress">
                    <div className="recent-assigned-complaints-progress-label">
                      <span>Progress</span>
                      <span>
                        {complaint.status === "Assigned"
                          ? "0%"
                          : complaint.status === "In Progress"
                          ? "50%"
                          : complaint.status === "Completed"
                          ? "100%"
                          : "0%"}
                      </span>
                    </div>
                    <div className="recent-assigned-complaints-progress-bar">
                      <div
                        className="recent-assigned-complaints-progress-fill"
                        style={{
                          width:
                            complaint.status === "Assigned"
                              ? "0%"
                              : complaint.status === "In Progress"
                              ? "50%"
                              : complaint.status === "Completed"
                              ? "100%"
                              : "0%",
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="recent-assigned-complaints-actions">
                    <button
                      className="recent-assigned-complaints-view-btn"
                      onClick={() => handleViewDetails(complaint)}
                    >
                      <span className="recent-assigned-complaints-btn-icon">
                        👁️
                      </span>
                      View Details
                    </button>
                    <button
                      className="recent-assigned-complaints-update-btn"
                      onClick={() => handleOpenUpdateModal(complaint.id)}
                    >
                      <span className="recent-assigned-complaints-btn-icon">
                        🔄
                      </span>
                      Update Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
     
        </div>
      </div>

     
    </div>
  );
};

export default DashboardOverview;
