import React, { useState, useEffect } from "react";
import Header from "../studentDashBoardComponents/common/Header";
import Sidebar from "../studentDashBoardComponents/common/Sidebar";
import StatsCards from "../studentDashBoardComponents/dashboard/StatsCards";
import RecentComplaints from "../studentDashBoardComponents/dashboard/RecentComplaints";
import ComplaintForm from "../studentDashBoardComponents/complaints/ComplaintForm";
import ComplaintHistory from "../studentDashBoardComponents/complaints/ComplaintHistory";
import FeedbackModal from "../studentDashBoardComponents/modals/FeedbackModal";
import DeleteConfirmationModal from "../studentDashBoardComponents/modals/DeleteConfirmationModal";
import ComplaintDetailsModal from "../studentDashBoardComponents/modals/ComplaintDetailsModal";
import SuccessToast from "../studentDashBoardComponents/common/SuccessToast";
import "../styles/StudentDashboard.css";
import axios from 'axios';

// Mock data for complaints
const mockComplaints = [
  {
    id: 1,
    title: "AC not working",
    category: "Maintenance",
    description:
      "AC in room 201 is not cooling properly. The temperature control seems to be malfunctioning and it's blowing hot air instead of cold.",
    status: "pending",
    priority: "high",
    createdAt: "2025-04-20T10:00:00",
    location: "Room 201",
  },
  {
    id: 2,
    title: "Water leakage",
    category: "Plumbing",
    description:
      "Water leaking from bathroom tap even when fully closed. The floor is constantly wet and might damage the tiles if not fixed soon.",
    status: "in-progress",
    priority: "medium",
    createdAt: "2025-04-19T15:30:00",
    location: "Room 105",
  },
  {
    id: 3,
    title: "Light bulb replacement",
    category: "Electrical",
    description:
      "Two light bulbs need replacement in the study area. It's quite dark in the evening making it difficult to study.",
    status: "completed",
    priority: "low",
    createdAt: "2025-04-18T09:15:00",
    location: "Corridor B",
    feedback: "The repair was done quickly and efficiently. Thank you!",
    rating: 5,
  },
  {
    id: 4,
    title: "Broken chair",
    category: "Furniture",
    description:
      "Chair in the study room has a broken leg and is unusable. Need replacement as soon as possible.",
    status: "pending",
    priority: "medium",
    createdAt: "2025-04-17T14:20:00",
    location: "Study Room 2",
  },
  {
    id: 5,
    title: "Wifi connectivity issues",
    category: "Network",
    description:
      "Poor wifi signal in the corner rooms of Block A. Unable to connect properly for online classes.",
    status: "in-progress",
    priority: "high",
    createdAt: "2025-04-16T11:45:00",
    location: "Block A, Rooms 301-305",
  },
];

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setComplaints(mockComplaints);
      updateStats(mockComplaints);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleComplaintSubmit = (complaintData) => {
    const newComplaint = {
      id: complaints.length + 1,
      ...complaintData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setComplaints([newComplaint, ...complaints]);
    updateStats([newComplaint, ...complaints]);
    showToast(
      "Complaint Submitted",
      "Your complaint has been successfully submitted."
    );
    setActiveSection("dashboard");
  };

  // const handleFeedbackSubmit = (feedbackData) => {
  //   const updatedComplaints = complaints.map((complaint) => {
  //     if (complaint.id === feedbackData.complaintId) {
  //       return {
  //         ...complaint,
  //         feedback: feedbackData.feedback,
  //         rating: feedbackData.rating,
  //       };
  //     }
  //     return complaint;
  //   });

  //   setComplaints(updatedComplaints);
  //   setShowFeedbackModal(false);
  //   showToast("Feedback Submitted", "Thank you for your feedback!");
  // };


  const handleFeedbackSubmit = async ({ complaintId, rating, feedback }) => {
    try {
      await axios.post('/api/feedback', {
        complaint_FK: complaintId,
        rating,
        text: feedback,
      });
  
      const updatedComplaints = complaints.map((c) =>
        c.id === complaintId ? { ...c, feedback, rating } : c
      );
      setComplaints(updatedComplaints);
      setShowFeedbackModal(false);
      showToast("Feedback Submitted", "Thank you for your feedback!");
    } catch (err) {
      console.error("Failed to submit feedback:", err);
      if (err.response) {
        console.error("Server responded with:", err.response.data);
      } else if (err.request) {
        console.error("No response received:", err.request);
      } else {
        console.error("Error setting up request:", err.message);
      }
      showToast("Error", "Unable to submit feedback. Please try again.");
    }
  };




  const handleComplaintDelete = (complaintId) => {
    const updatedComplaints = complaints.filter(
      (complaint) => complaint.id !== complaintId
    );
    setComplaints(updatedComplaints);
    updateStats(updatedComplaints);
    setShowDeleteModal(false);
    showToast(
      "Complaint Cancelled",
      "Your complaint has been cancelled successfully."
    );
  };

  const updateStats = (updatedComplaints) => {
    setStats({
      total: updatedComplaints.length,
      pending: updatedComplaints.filter((c) => c.status === "pending").length,
      inProgress: updatedComplaints.filter((c) => c.status === "in-progress")
        .length,
      resolved: updatedComplaints.filter((c) => c.status === "completed")
        .length,
    });
  };

  const showToast = (title, message) => {
    setSuccessMessage({ title, message });
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return (
          <div className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            <StatsCards stats={stats} />
            <RecentComplaints
              complaints={complaints.slice(0, 6)}
              onComplaintClick={(complaint) => {
                setSelectedComplaint(complaint);
                setShowDetailsModal(true);
              }}
            />
          </div>
        );
      case "new-complaint":
        return (
          <div className="file-complaint">
            <h2>File a New Complaint</h2>
            <ComplaintForm onSubmit={handleComplaintSubmit} />
          </div>
        );

      // case "new-complaint":
      //   return (
      //     <div className="file-complaint">
      //       <h2>File a New Complaint</h2>
      //       <ComplaintForm
      //         onSubmitSuccess={(newComplaint) => {
      //           setComplaints([newComplaint, ...complaints]);
      //           updateStats([newComplaint, ...complaints]);
      //           showToast("Complaint Submitted", "Your complaint has been successfully submitted.");
      //           setActiveSection("dashboard");
      //         }}
      //         onCancel={() => setActiveSection("dashboard")}
      //       />
      //     </div>
      //   );
      // case "history":
      //   return (
      //     <div className="complaint-history">
      //       {/* <h2>Complaint History</h2> */}
      //       <ComplaintHistory 
                
      //       />
      //     </div>
      //   );



      case "history":
        return (
          <div className="complaint-history">
            <h2>Complaint History</h2>
            <ComplaintHistory
              onViewDetails={(complaint) => {
                setSelectedComplaint(complaint);
                setShowDetailsModal(true);
              }}
              onFeedback={(complaint) => {
                setSelectedComplaint(complaint);
                setShowFeedbackModal(true);
              }}
              onDelete={(complaint) => {
                setSelectedComplaint(complaint);
                setShowDeleteModal(true);
              }}
            />
          </div>
        );

      case "analytics":
        return (
          <div className="analytics-section">
            <h2>Analytics & Statistics</h2>
            <p className="section-message">Analytics feature coming soon!</p>
          </div>
        );
      case "settings":
        return (
          <div className="settings-section">
            <h2>Account Settings</h2>
            <p className="section-message">Settings feature coming soon!</p>
          </div>
        );
      case "help":
        return (
          <div className="help-section">
            <h2>Help & Support</h2>
            <p className="section-message">Help center coming soon!</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="student-dashboard">
      <Header />
      <div className="dashboard-container">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="main-content">{renderContent()}</main>
      </div>

      {successMessage && (
        <div className="success-toast">
          <div className="success-toast-content">
            <div className="success-icon">✓</div>
            <div>
              <h4>{successMessage.title}</h4>
              <p>{successMessage.message}</p>
            </div>
          </div>
        </div>
      )}

      <FeedbackModal
        isVisible={showFeedbackModal}
        complaintId={selectedComplaint?.id}
        onClose={() => {
          setShowFeedbackModal(false);
          setSelectedComplaint(null);
        }}
        onSubmit={handleFeedbackSubmit}
      />

      <DeleteConfirmationModal
        isVisible={showDeleteModal}
        complaintId={selectedComplaint?.id}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedComplaint(null);
        }}
        onConfirm={() => handleComplaintDelete(selectedComplaint?.id)}
      />

      <ComplaintDetailsModal
        isVisible={showDetailsModal}
        complaint={selectedComplaint}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedComplaint(null);
        }}
      />
    </div>
  );
};

export default StudentDashboard;
