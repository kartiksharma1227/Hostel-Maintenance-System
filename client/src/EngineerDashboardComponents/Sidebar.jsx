// src/EngineerDashBoardComponents/Sidebar.jsx
const Sidebar = ({ activeSection, setActiveSection, pendingComplaints }) => {
  return (
    <aside className="engineer-sidebar">
      <nav className="engineer-sidebar-nav">
        <ul>
          <li>
            <button
              className={activeSection === "dashboard" ? "active" : ""}
              onClick={() => setActiveSection("dashboard")}
            >
              <span className="engineer-nav-icon">📊</span>
              <span>Dashboard</span>
            </button>
          </li>
          <li>
            <button
              className={activeSection === "new-complaints" ? "active" : ""}
              onClick={() => setActiveSection("new-complaints")}
            >
              <span className="engineer-nav-icon">🔔</span>
              <span>New Complaints</span>
              {pendingComplaints.length > 0 && (
                <span className="engineer-nav-badge">{pendingComplaints.length}</span>
              )}
            </button>
          </li>
          <li>
            <button
              className={activeSection === "assigned" ? "active" : ""}
              onClick={() => setActiveSection("assigned")}
            >
              <span className="engineer-nav-icon">📋</span>
              <span>Assigned Complaints</span>
            </button>
          </li>
          <li>
            <button
              className={activeSection === "history" ? "active" : ""}
              onClick={() => setActiveSection("history")}
            >
              <span className="engineer-nav-icon">📜</span>
              <span>Completed complaints</span>
            </button>
          </li>
          <li>
            <button
              className={activeSection === "schedule" ? "active" : ""}
              onClick={() => setActiveSection("schedule")}
            >
              <span className="engineer-nav-icon">📅</span>
              <span>Schedule</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
