import React from "react";
import {
  FaHome,
  FaPlus,
  FaHistory,
  FaQuestionCircle,
  FaCog,
  FaChartBar,
} from "react-icons/fa";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <FaHome />,
  },
  {
    id: "new-complaint",
    label: "New Complaint",
    icon: <FaPlus />,
  },
  {
    id: "history",
    label: "Complaint History",
    icon: <FaHistory />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <FaChartBar />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <FaCog />,
  },
  {
    id: "help",
    label: "Help",
    icon: <FaQuestionCircle />,
  },
];

const Sidebar = ({ activeSection, onSectionChange }) => {
  return (
    <div className="sidebar enhanced">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="brand-icon">MP</span>
          <span className="brand-text">Student Portal</span>
        </div>
      </div>
      <nav className="sidebar-nav enhanced">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={activeSection === item.id ? "active" : ""}
                onClick={() => onSectionChange(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {activeSection === item.id && (
                  <span className="active-indicator"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="sidebar-footer">
        <div className="app-version">v2.0.1</div>
      </div>
    </div>
  );
};

export default Sidebar;
