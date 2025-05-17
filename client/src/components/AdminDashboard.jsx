import React, { useState, useEffect, useRef } from "react";
import Header from "../adminDashBoardComponents/layout/Header";
import Sidebar from "../adminDashBoardComponents/layout/Sidebar";
import Dashboard from "../adminDashBoardComponents/dashboard/Dashboard";
import Complaints from "../adminDashBoardComponents/complaints/Complaints";
import EngineersList from "../adminDashBoardComponents/engineers/EngineersList";
import AddEngineerForm from "../adminDashBoardComponents/engineers/AddEngineerForm";
import ComplaintDetailsModal from "../adminDashBoardComponents/modals/ComplaintDetailsModal";
import AssignComplaintModal from "../adminDashBoardComponents/modals/AssignComplaintModal";
import NotificationsPanel from "../adminDashBoardComponents/common/NotificationsPanel";
import ProfileDropdown from "../adminDashBoardComponents/common/ProfileDropdown";
import SuccessToast from "../adminDashBoardComponents/common/SuccessToast";
import "../styles/AdminDashboard.css";

const API_BASE = "http://localhost:4000/api";

const AdminDashboard = () => {
  const [adminProfile] = useState({
    name: "Admin User",
    email: "admin@iiita.ac.in",
    phone: "+91 9876543210",
  });
  const [activeSection, setActiveSection] = useState("dashboard");
  const [notifications, setNotifications] = useState([]);
  const [notificationPanelVisible, setNotificationPanelVisible] = useState(false);
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const profileDropdownRef = useRef(null);

  const [complaints, setComplaints] = useState([]);
  const [engineers, setEngineers] = useState([]);
  const [successMessage, setSuccessMessage] = useState({ visible: false, message: "" });

  const [complaintDetailsModal, setComplaintDetailsModal] = useState({
    visible: false,
    complaint: null,
  });
  const [assignEngineerModal, setAssignEngineerModal] = useState({
    visible: false,
    complaintId: null,
  });

  // Fetch initial data
  useEffect(() => {
    fetch(`${API_BASE}/complaints`)
      .then((res) => res.json())
      .then(setComplaints)
      .catch((err) => console.error(err));

    fetch(`${API_BASE}/admin/engineers`)
      .then((res) => res.json())
      .then(setEngineers)
      .catch((err) => {
        console.error(err);
        setEngineers([]);
      });

    fetch(`${API_BASE}/notifications`)
      .then((res) => res.json())
      .then(setNotifications)
      .catch((err) => console.error(err));
  }, []);

  const handleAssignEngineerSubmit = async ({ complaintId, engineerId }) => {
    try {
      const res = await fetch(`${API_BASE}/complaints/${complaintId}/assign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ engineerId }),
      });
      if (!res.ok) throw new Error("Assignment failed");
      const updated = await res.json();
      setComplaints((prev) => prev.map((c) => (c.id === complaintId ? updated : c)));
      setSuccessMessage({ visible: true, message: "Engineer assigned successfully!" });
      setTimeout(() => setSuccessMessage({ visible: false, message: "" }), 3000);
      setAssignEngineerModal({ visible: false, complaintId: null });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddEngineer = async (engineerData) => {
    try {
      const res = await fetch(`${API_BASE}/admin/engineer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(engineerData),
      });
  
      if (!res.ok) throw new Error("Add engineer failed");
  
      const saved = await res.json();
  
      // Create engineer object expected by EngineersList
      const newEngineer = {
        id: saved.engineerId || Math.random(),
        name: saved.name || engineerData.name || "Unnamed",
        email: saved.mail_UN || engineerData.mail_UN || "noemail@domain.com",
        specialization: saved.specialization || "General",
        phone: saved.phone_number || engineerData.phone_number || "N/A",
        status: saved.availability || "Available",
        assignedComplaints: 0,
        completedComplaints: 0,
      };
  
      setEngineers((prev) => [...prev, newEngineer]);
      setActiveSection("engineers");
  
      setSuccessMessage({ visible: true, message: "Engineer added successfully!" });
      setTimeout(() => setSuccessMessage({ visible: false, message: "" }), 3000);
    } catch (err) {
      alert(err.message);
    }
  };
  
  

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible((v) => !v);
    if (notificationPanelVisible) setNotificationPanelVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setProfileDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="admin-dashboard">
      <Header
        adminProfile={adminProfile}
        notifications={notifications}
        notificationPanelVisible={notificationPanelVisible}
        setNotificationPanelVisible={setNotificationPanelVisible}
        profileDropdownVisible={profileDropdownVisible}
        toggleProfileDropdown={toggleProfileDropdown}
      />

      <div className="dashboard-container">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

        <main className="main-content">
          {activeSection === "dashboard" && (
            <Dashboard
              complaints={complaints}
              handleViewDetails={(c) => setComplaintDetailsModal({ visible: true, complaint: c })}
              handleAssignEngineer={(id) => setAssignEngineerModal({ visible: true, complaintId: id })}
            />
          )}

          {activeSection === "complaints" && (
            <Complaints
              complaints={complaints}
              handleViewDetails={(c) => setComplaintDetailsModal({ visible: true, complaint: c })}
              handleAssignEngineer={(id) => setAssignEngineerModal({ visible: true, complaintId: id })}
            />
          )}

          {activeSection === "engineers" && (
            <EngineersList engineers={engineers} handleEngineerDetails={() => {}} />
          )}

          {activeSection === "add-engineer" && <AddEngineerForm onSubmit={handleAddEngineer} />}
        </main>

        {notificationPanelVisible && (
          <NotificationsPanel
            notifications={notifications}
            onMarkAsRead={(id) => {}}
            onMarkAllAsRead={() => {}}
          />
        )}

        <ProfileDropdown
          ref={profileDropdownRef}
          adminProfile={adminProfile}
          visible={profileDropdownVisible}
          onLogout={() => console.log("logout")}
        />

        {complaintDetailsModal.visible && (
          <ComplaintDetailsModal
            complaint={complaintDetailsModal.complaint}
            onClose={() => setComplaintDetailsModal({ visible: false, complaint: null })}
          />
        )}

        {assignEngineerModal.visible && (
          <AssignComplaintModal
            complaint={complaints.find((c) => c.id === assignEngineerModal.complaintId)}
            engineers={engineers}
            onAssign={handleAssignEngineerSubmit}
            onClose={() => setAssignEngineerModal({ visible: false, complaintId: null })}
          />
        )}

        <SuccessToast message={successMessage.message} visible={successMessage.visible} />
      </div>
    </div>
  );
};

export default AdminDashboard;
