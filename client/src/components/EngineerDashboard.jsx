// src/Components/EngineerDashboard.jsx
import { useState, useEffect, useRef } from "react";
import Header from "../EngineerDashBoardComponents/Header";
import Sidebar from "../EngineerDashBoardComponents/Sidebar";
import DashboardOverview from "../EngineerDashBoardComponents/DashboardOverview";
import NewComplaints from "../EngineerDashBoardComponents/NewComplaints";
import AssignedComplaints from "../EngineerDashBoardComponents/AssignedComplaints";
import ComplaintHistory from "../EngineerDashBoardComponents/ComplaintHistory";
import Schedule from "../EngineerDashBoardComponents/Schedule";
import UpdateModal from "../EngineerDashBoardComponents/UpdateModal";
import DetailsModal from "../EngineerDashBoardComponents/DetailsModal";
import NotificationPanel from "../EngineerDashBoardComponents/NotificationPanel";
import "../styles/EngineerDashboard.css";

const EngineerDashboard = () => {
  // ... (All dummy data and state declarations remain unchanged.)
  const [updateForm, setUpdateForm] = useState({
    status: "",
    workDone: "",
    partsReplaced: "",
    nextVisitDate: "",
    comments: "",
  });
  const [engineerProfile, setEngineerProfile] = useState({
    name: "Robert Smith",
    employeeId: "ENG-2023-007",
    email: "robert.smith@iiita.ac.in",
    department: "Electrical Maintenance",
    specialization: "HVAC & Electrical Systems",
    experience: "8 years",
    contactNumber: "+91 9876543210",
    address: "Staff Quarters, Block B, Room 105",
  });
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const profileDropdownRef = useRef(null);
  const profileAvatarRef = useRef(null);
  const [pendingComplaints, setPendingComplaints] = useState([
    {
      id: 6,
      title: "Broken Chair",
      category: "Furniture",
      description: "Chair in Room 302 has a broken leg and is unusable",
      location: "Room 302",
      priority: "medium",
      studentName: "Lisa Thompson",
      studentContact: "+91 9876543215",
      reportDate: "2023-06-18",
      status: "New",
    },
    {
      id: 7,
      title: "Sink Clogged",
      category: "Plumbing",
      description: "Sink in the Boys Hostel common bathroom is clogged",
      location: "Boys Hostel - Block C",
      priority: "high",
      studentName: "Mark Wilson",
      studentContact: "+91 9876543216",
      reportDate: "2023-06-18",
      status: "New",
    },
    {
      id: 8,
      title: "Projector Remote Missing",
      category: "Electronics",
      description: "The remote for the projector in Room 105 is missing",
      location: "Room 105",
      priority: "low",
      studentName: "Emma Davis",
      studentContact: "+91 9876543217",
      reportDate: "2023-06-17",
      status: "New",
    },
  ]);
  const [assignedComplaints, setAssignedComplaints] = useState([
    {
      id: 1,
      title: "AC not working",
      category: "HVAC",
      description: "AC in Classroom 201 is not cooling properly",
      location: "Classroom 201",
      status: "In Progress",
      priority: "high",
      studentName: "John Doe",
      studentContact: "+91 9876543210",
      reportDate: "2023-06-10",
      assignedDate: "2023-06-11",
      lastUpdated: "2023-06-14",
      comments: [
        {
          date: "2023-06-11",
          text: "Initial inspection completed. Need replacement parts.",
        },
        {
          date: "2023-06-14",
          text: "Replaced compressor and refilled refrigerant. Need to check again tomorrow.",
        },
      ],
      visitHistory: [
        {
          date: "2023-06-11",
          time: "10:30 AM",
          type: "initial",
          workDone:
            "Inspected the AC unit and diagnosed issues with the compressor and refrigerant levels. Determined parts needed for repairs.",
          outcome: "Diagnosed",
        },
        {
          date: "2023-06-14",
          time: "2:15 PM",
          type: "repair",
          workDone:
            "Replaced compressor, refilled refrigerant, and cleaned air filters. Tested cooling function.",
          partsReplaced: ["Compressor", "Air Filters"],
          outcome: "In Progress",
        },
      ],
    },
    {
      id: 2,
      title: "Broken Projector",
      category: "Electronics",
      description: "Projector in Lecture Hall 3 shows distorted colors",
      location: "Lecture Hall 3",
      status: "Pending",
      priority: "medium",
      studentName: "Jane Smith",
      studentContact: "+91 9876543211",
      reportDate: "2023-06-15",
      assignedDate: "2023-06-16",
      lastUpdated: "2023-06-16",
      comments: [],
      visitHistory: [],
    },
    {
      id: 3,
      title: "Flickering Lights",
      category: "Electrical",
      description: "Lights in Computer Lab 2 are flickering continuously",
      location: "Computer Lab 2",
      status: "Scheduled",
      priority: "medium",
      studentName: "Mike Johnson",
      studentContact: "+91 9876543212",
      reportDate: "2023-06-14",
      assignedDate: "2023-06-15",
      lastUpdated: "2023-06-15",
      scheduledVisit: "2023-06-17 11:00 AM",
      comments: [
        {
          date: "2023-06-15",
          text: "Scheduled visit for inspection on June 17th.",
        },
      ],
      visitHistory: [],
    },
  ]);
  const [completedComplaints, setCompletedComplaints] = useState([
    {
      id: 4,
      title: "Leaking Water Cooler",
      category: "Plumbing",
      description: "Water cooler near library entrance is leaking",
      location: "Library Entrance",
      status: "Completed",
      priority: "high",
      studentName: "Sarah Williams",
      studentContact: "+91 9876543213",
      reportDate: "2023-06-05",
      assignedDate: "2023-06-06",
      completedDate: "2023-06-08",
      feedback: {
        rating: 5,
        comment: "Great service! Fixed very quickly.",
      },
      comments: [
        {
          date: "2023-06-06",
          text: "Identified leak in main valve. Need replacement parts.",
        },
        {
          date: "2023-06-08",
          text: "Replaced valve and fixed leakage. Tested and working properly.",
        },
      ],
      visitHistory: [
        {
          date: "2023-06-06",
          time: "1:30 PM",
          type: "initial",
          workDone: "Diagnosed issue with main valve causing water leakage.",
          outcome: "Diagnosed",
        },
        {
          date: "2023-06-08",
          time: "11:15 AM",
          type: "repair",
          workDone:
            "Replaced main valve and sealed connections. Tested for any leaks.",
          partsReplaced: ["Main Valve", "Rubber Seals"],
          outcome: "Completed",
        },
      ],
    },
    {
      id: 5,
      title: "Faulty Power Socket",
      category: "Electrical",
      description: "Power socket in Seminar Hall not working",
      location: "Seminar Hall",
      status: "Completed",
      priority: "low",
      studentName: "David Brown",
      studentContact: "+91 9876543214",
      reportDate: "2023-06-07",
      assignedDate: "2023-06-08",
      completedDate: "2023-06-09",
      feedback: {
        rating: 4,
        comment: "Good service, fixed the issue well.",
      },
      comments: [
        {
          date: "2023-06-08",
          text: "Checked socket, need to replace wiring and socket unit.",
        },
        {
          date: "2023-06-09",
          text: "Replaced socket and fixed wiring. All working now.",
        },
      ],
      visitHistory: [
        {
          date: "2023-06-08",
          time: "3:45 PM",
          type: "initial",
          workDone: "Inspected faulty power socket and internal wiring.",
          outcome: "Diagnosed",
        },
        {
          date: "2023-06-09",
          time: "10:00 AM",
          type: "repair",
          workDone:
            "Replaced socket unit and fixed internal wiring. Tested power flow.",
          partsReplaced: ["Power Socket", "Internal Wiring"],
          outcome: "Completed",
        },
      ],
    },
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New complaint assigned to you: Broken Projector",
      read: false,
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "Student provided feedback on Leaking Water Cooler complaint",
      read: false,
      time: "1 day ago",
    },
    {
      id: 3,
      message: "Reminder: Scheduled visit tomorrow for Flickering Lights",
      read: true,
      time: "3 hours ago",
    },
  ]);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [notificationPanelVisible, setNotificationPanelVisible] = useState(false);
  const [updateModal, setUpdateModal] = useState({ visible: false, complaintId: null });
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [successMessage, setSuccessMessage] = useState({ visible: false, message: "" });
  const [scheduledVisits, setScheduledVisits] = useState([
    {
      id: 3,
      title: "Flickering Lights",
      location: "Computer Lab 2",
      date: "2023-06-17",
      time: "11:00 AM",
    },
    {
      id: 1,
      title: "AC not working - Follow-up",
      location: "Classroom 201",
      date: "2023-06-18",
      time: "10:00 AM",
    },
  ]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    let result = [...assignedComplaints];
    if (statusFilter !== "all") {
      result = result.filter(
        (complaint) =>
          complaint.status.toLowerCase().replace(" ", "-") === statusFilter
      );
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (complaint) =>
          complaint.title.toLowerCase().includes(query) ||
          complaint.description.toLowerCase().includes(query) ||
          complaint.location.toLowerCase().includes(query) ||
          complaint.category.toLowerCase().includes(query) ||
          complaint.studentName.toLowerCase().includes(query)
      );
    }
    setFilteredComplaints(result);
  }, [statusFilter, searchQuery, assignedComplaints]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownVisible &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileAvatarRef.current &&
        !profileAvatarRef.current.contains(event.target)
      ) {
        setProfileDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropdownVisible]);

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const complaintId = updateModal.complaintId;
    const updatedComplaints = assignedComplaints
      .map((complaint) => {
        if (complaint.id === complaintId) {
          const newComment = {
            date: new Date().toISOString().split("T")[0],
            text: updateForm.comments,
          };
          const newVisit = {
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            type: "follow-up",
            workDone: updateForm.workDone,
            partsReplaced: updateForm.partsReplaced
              ? updateForm.partsReplaced.split(",").map((part) => part.trim())
              : [],
            outcome: updateForm.status,
          };
          if (updateForm.status === "Completed") {
            const completedComplaint = {
              ...complaint,
              status: "Completed",
              completedDate: new Date().toISOString().split("T")[0],
              lastUpdated: new Date().toISOString().split("T")[0],
              comments: [...complaint.comments, newComment],
              visitHistory: [...complaint.visitHistory, newVisit],
            };
            setCompletedComplaints((prev) => [completedComplaint, ...prev]);
            return null;
          }
          return {
            ...complaint,
            status: updateForm.status || complaint.status,
            lastUpdated: new Date().toISOString().split("T")[0],
            scheduledVisit: updateForm.nextVisitDate
              ? `${updateForm.nextVisitDate} (Time TBD)`
              : complaint.scheduledVisit,
            comments: [...complaint.comments, newComment],
            visitHistory: [...complaint.visitHistory, newVisit],
          };
        }
        return complaint;
      })
      .filter(Boolean);
    setAssignedComplaints(updatedComplaints);
    if (updateForm.nextVisitDate) {
      const complaintDetails = assignedComplaints.find((c) => c.id === complaintId);
      const newScheduledVisit = {
        id: complaintId,
        title: complaintDetails.title,
        location: complaintDetails.location,
        date: updateForm.nextVisitDate,
        time: "TBD",
      };
      setScheduledVisits((prev) => [...prev, newScheduledVisit]);
    }
    const newNotification = {
      id: notifications.length + 1,
      message: `You updated the status of complaint #${complaintId} to ${updateForm.status}`,
      read: false,
      time: "Just now",
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setUpdateForm({
      status: "",
      workDone: "",
      partsReplaced: "",
      nextVisitDate: "",
      comments: "",
    });
    setUpdateModal({ visible: false, complaintId: null });
    setSuccessMessage({ visible: true, message: "Complaint updated successfully!" });
    setTimeout(() => setSuccessMessage({ visible: false, message: "" }), 3000);
  };

  const handleViewDetails = (complaint) => {
    setSelectedComplaint(complaint);
    setShowDetailsModal(true);
  };

  const handleOpenUpdateModal = (complaintId) => {
    setUpdateModal({ visible: true, complaintId });
  };

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!profileDropdownVisible);
    if (notificationPanelVisible) {
      setNotificationPanelVisible(false);
    }
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "plumbing":
        return "🚿";
      case "electrical":
        return "💡";
      case "furniture":
        return "🪑";
      case "hvac":
        return "❄️";
      case "electronics":
        return "🖥️";
      default:
        return "🔧";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const handleAcceptComplaint = (complaint) => {
    const acceptedComplaint = {
      ...complaint,
      status: "Pending",
      assignedDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      comments: [],
      visitHistory: [],
    };
    setAssignedComplaints((prev) => [...prev, acceptedComplaint]);
    setPendingComplaints((prev) => prev.filter((c) => c.id !== complaint.id));
    const newNotification = {
      id: notifications.length + 1,
      message: `You accepted complaint #${complaint.id}: ${complaint.title}`,
      read: false,
      time: "Just now",
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setSuccessMessage({ visible: true, message: "Complaint accepted successfully!" });
    setTimeout(() => setSuccessMessage({ visible: false, message: "" }), 3000);
  };

  const handleRejectComplaint = (complaint) => {
    setPendingComplaints((prev) => prev.filter((c) => c.id !== complaint.id));
    const newNotification = {
      id: notifications.length + 1,
      message: `You rejected complaint #${complaint.id}: ${complaint.title}`,
      read: false,
      time: "Just now",
    };
    setNotifications((prev) => [newNotification, ...prev]);
    setSuccessMessage({ visible: true, message: "Complaint rejected successfully!" });
    setTimeout(() => setSuccessMessage({ visible: false, message: "" }), 3000);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
  };

  return (
    <div className="engineer-dashboard">
      {successMessage.visible && (
        <div className="engineer-success-toast">
          <div className="engineer-success-toast-content">
            <span className="engineer-success-icon">✓</span>
            <p>{successMessage.message}</p>
          </div>
        </div>
      )}

      <Header 
        engineerProfile={engineerProfile}
        profileDropdownVisible={profileDropdownVisible}
        toggleProfileDropdown={toggleProfileDropdown}
        profileAvatarRef={profileAvatarRef}
        toggleNotificationPanel={() => setNotificationPanelVisible(!notificationPanelVisible)}
        notificationPanelVisible={notificationPanelVisible}
        notifications={notifications}
      />

      <div className="engineer-dashboard-container">
        <Sidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          pendingComplaints={pendingComplaints}
        />

        <main className="engineer-main-content">
          {activeSection === "dashboard" && (
            <DashboardOverview 
              pendingComplaints={pendingComplaints}
              assignedComplaints={assignedComplaints}
              completedComplaints={completedComplaints}
              scheduledVisits={scheduledVisits}
            />
          )}

          {activeSection === "new-complaints" && (
            <NewComplaints 
              pendingComplaints={pendingComplaints}
              getPriorityIcon={getPriorityIcon}
              getCategoryIcon={getCategoryIcon}
              handleViewDetails={handleViewDetails}
              handleRejectComplaint={handleRejectComplaint}
              handleAcceptComplaint={handleAcceptComplaint}
            />
          )}

          {activeSection === "assigned" && (
            <AssignedComplaints 
              filteredComplaints={filteredComplaints}
              setStatusFilter={setStatusFilter}
              statusFilter={statusFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              getPriorityIcon={getPriorityIcon}
              getCategoryIcon={getCategoryIcon}
              handleViewDetails={handleViewDetails}
              handleOpenUpdateModal={handleOpenUpdateModal}
            />
          )}

          {activeSection === "history" && (
            <ComplaintHistory 
              completedComplaints={completedComplaints}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              getCategoryIcon={getCategoryIcon}
              handleViewDetails={handleViewDetails}
            />
          )}

          {activeSection === "schedule" && (
            <Schedule 
              scheduledVisits={scheduledVisits}
              assignedComplaints={assignedComplaints}
              getCategoryIcon={getCategoryIcon}
              handleViewDetails={handleViewDetails}
            />
          )}
        </main>

        {notificationPanelVisible && (
          <NotificationPanel 
            notifications={notifications}
            markAllNotificationsAsRead={markAllNotificationsAsRead}
            markNotificationAsRead={markNotificationAsRead}
          />
        )}

        {updateModal.visible && (
          <UpdateModal 
            updateModal={updateModal}
            updateForm={updateForm}
            handleUpdateFormChange={handleUpdateFormChange}
            handleUpdateSubmit={handleUpdateSubmit}
            assignedComplaints={assignedComplaints}
            getCategoryIcon={getCategoryIcon}
            setUpdateModal={setUpdateModal}
          />
        )}

        {showDetailsModal && selectedComplaint && (
          <DetailsModal 
            selectedComplaint={selectedComplaint}
            closeDetailsModal={closeDetailsModal}
          />
        )}
      </div>
    </div>
  );
};

export default EngineerDashboard;
