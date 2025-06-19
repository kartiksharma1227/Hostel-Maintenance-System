// src/EngineerDashBoardComponents/DashboardOverview.jsx
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
const DashboardOverview = ({ pendingComplaints, assignedComplaints, completedComplaints, scheduledVisits }) => {
  // console.log('Total complaints',pendingComplaints);
  console.log('Assigned complaints',assignedComplaints);
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
            {assignedComplaints.filter((c) => c.status === "In Progress").length}
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
        <div className="engineer-dashboard-section engineer-upcoming-visits">
          <h3>Upcoming Scheduled Visits</h3>
          {scheduledVisits.length === 0 ? (
            <div className="engineer-no-results">
              <p>No upcoming visits scheduled</p>
            </div>
          ) : (
            <div className="engineer-visits-list">
              {scheduledVisits.map((visit) => (
                <div className="engineer-visit-card" key={visit.id}>
                  <div className="engineer-visit-date">
                    <div className="engineer-date-box">
                      <span className="engineer-month">
                        {new Date(visit.date).toLocaleString("default", { month: "short" })}
                      </span>
                      <span className="engineer-day">{new Date(visit.date).getDate()}</span>
                    </div>
                    <span className="engineer-time">{visit.time}</span>
                  </div>
                  <div className="engineer-visit-details">
                    <h4>{visit.title}</h4>
                    <p className="engineer-visit-location">📍 {visit.location}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="engineer-dashboard-section engineer-recent-complaints">
          <h3>Recent Assigned Complaints</h3>
          {assignedComplaints.length === 0 ? (
            <div className="engineer-no-results">
              <p>No complaints assigned to you yet</p>
            </div>
          ) : (
            <div className="engineer-assigned-complaints-section">
              <div className="engineer-assigned-complaints-container">
                {assignedComplaints.map((complaint) => (
                  <div className="engineer-assigned-complaint-card" key={complaint.complaint_FK}>
                    <div className="engineer-complaint-header">
                      <span className="engineer-complaint-id">#{complaint.complaint_FK}</span>
                      <span className={`engineer-complaint-status ${String(complaint.status || "") .toLowerCase().replace(" ", "-")}`}>
                        {complaint.status}
                      </span>
                    </div>
                    <h4 className="engineer-complaint-title">{complaint.title}</h4>
                    <p className="engineer-complaint-description">{(complaint.description || "").substring(0, 100)}...</p>
                    <div className="engineer-complaint-meta">
                      <span className="engineer-complaint-location">📍 {complaint.location}</span>
                      <span className="engineer-complaint-date">{formatDate(complaint.assigned_date)}</span>
                    </div>
                    <div className="engineer-complaint-actions">
                      <button className="engineer-view-details-btn" onClick={() => { /* Pass handler via props if needed */ }}>
                        View Details
                      </button>
                      <button className="engineer-update-status-btn" onClick={() => { /* Pass handler via props if needed */ }}>
                        Update Status
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {assignedComplaints.length > 3 && (
            <div className="engineer-view-all-container">
              <button className="engineer-view-all-btn" onClick={() => { /* Switch active section in parent */ }}>
                View All Assigned Complaints
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="engineer-performance-metrics">
        <h3>Performance Metrics</h3>
        <div className="engineer-metrics-cards">
          <div className="engineer-metric-card">
            <div className="engineer-metric-icon">⏱️</div>
            <div className="engineer-metric-content">
              <h4>Avg. Resolution Time</h4>
              <p className="engineer-metric-value">2.3 days</p>
            </div>
          </div>
          <div className="engineer-metric-card">
            <div className="engineer-metric-icon">⭐</div>
            <div className="engineer-metric-content">
              <h4>Avg. Feedback Rating</h4>
              <p className="engineer-metric-value">4.5/5</p>
            </div>
          </div>
          <div className="engineer-metric-card">
            <div className="engineer-metric-icon">✅</div>
            <div className="engineer-metric-content">
              <h4>Completion Rate</h4>
              <p className="engineer-metric-value">95%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
