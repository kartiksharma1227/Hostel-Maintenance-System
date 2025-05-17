// File: Dbms1/src/EngineerDashboardComponents/AssignedComplaints.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaSearch,
  FaEye,
  FaFilter,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import UpdateModal from "./UpdateModal";
import DetailsModal from "./DetailsModal";
import "../styles/EngineerDashboard.css";

export default function AssignedComplaints() {
  // state for fetched complaints
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // filter / search state
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // update modal state & form (only status & description)
  const [updateModal, setUpdateModal] = useState({ visible: false, complaintId: null });
  const [updateForm, setUpdateForm] = useState({
    status: "",
    description: "",
  });

  // details modal state
  const [detailsModal, setDetailsModal] = useState({ visible: false, complaint: null });

  // fetch data on mount and whenever filters change
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaint-history", {
          params: {
            status: statusFilter,
            category: "all",
            search: searchQuery,
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching assigned complaints:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaints();
  }, [statusFilter, searchQuery]);

  // apply client-side filtering for responsiveness
  // only show those NOT completed
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || c.status === statusFilter;
    const notCompleted = c.status !== "completed";
    return matchesSearch && matchesStatus && notCompleted;
  });

  // simple icons for priority
  const getPriorityIcon = (priority) =>
    priority === "High" ? "⚠️" :
    priority === "Medium" ? "🔶" :
    "✅";

  // simple icons for category
  const getCategoryIcon = (category) =>
    category === "Plumbing" ? "🚰" :
    category === "Electrical" ? "💡" :
    category === "Furniture" ? "🪑" :
    category === "HVAC" ? "❄️" :
    "⚙️";

  // view details handler
  const handleViewDetails = (complaint) => {
    setDetailsModal({ visible: true, complaint });
  };

  // close details modal
  const closeDetailsModal = () => setDetailsModal({ visible: false, complaint: null });

  // open update modal handler
  const handleOpenUpdateModal = (id) => {
    setUpdateModal({ visible: true, complaintId: id });
    // reset form fields
    setUpdateForm({ status: "", description: "" });
  };

  // form change handler
  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({ ...prev, [name]: value }));
  };

  // form submit handler
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/compUpd/update", {
        id: updateModal.complaintId,
        status: updateForm.status,
        description: updateForm.description,
      });
      // update local state
      setComplaints((cs) =>
        cs.map((c) =>
          c.id === updateModal.complaintId
            ? { ...c, status: updateForm.status, description: updateForm.description, updated_at: new Date().toISOString() }
            : c
        )
      );
    } catch (error) {
      console.error("Error updating complaint status:", error);
    } finally {
      setUpdateModal({ visible: false, complaintId: null });
    }
  };

  if (isLoading) {
    return <p>Loading assigned complaints...</p>;
  }

  return (
    <div className="engineer-assigned-complaints">
      <h2>Assigned Complaints</h2>

      <div className="engineer-complaint-filters">
        <select
          className="engineer-filter-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Complaints</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <input
          type="text"
          placeholder="Search complaints..."
          className="engineer-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="engineer-no-results">
          <p>No complaints found matching your filters</p>
          <button
            className="engineer-reset-filter-btn"
            onClick={() => {
              setStatusFilter("all");
              setSearchQuery("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="engineer-table-container" style={{ overflowX: "auto" }}>
          <table className="engineer-complaints-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Assigned Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((complaint) => (
                <tr key={complaint.id}>
                  <td>#{complaint.id}</td>
                  <td>{complaint.title}</td>
                  <td>
                    <span className="engineer-category-label">
                      <span className="engineer-category-icon">
                        {getCategoryIcon(complaint.category)}
                      </span>
                      {complaint.category}
                    </span>
                  </td>
                  <td>{complaint.location}</td>
                  <td>
                    <span
                      className={`engineer-priority-indicator ${complaint.priority}`}
                    >
                      {getPriorityIcon(complaint.priority)} {complaint.priority}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`engineer-status-badge ${complaint.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {complaint.status}
                    </span>
                  </td>
                  <td>{complaint.assignedDate || complaint.created_at}</td>
                  <td>
                    <div className="engineer-action-buttons">
                      <button
                        className="engineer-action-btn engineer-view-btn"
                        onClick={() => handleViewDetails(complaint)}
                        title="View Details"
                      >
                        <span className="engineer-btn-icon">👁️</span> View
                      </button>
                      <button
                        className="engineer-action-btn engineer-update-btn"
                        onClick={() => handleOpenUpdateModal(complaint.id)}
                        title="Update Status"
                      >
                        <span className="engineer-btn-icon">🔄</span> Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {updateModal.visible && (
        <UpdateModal
          updateModal={updateModal}
          updateForm={updateForm}
          handleUpdateFormChange={handleUpdateFormChange}
          handleUpdateSubmit={handleUpdateSubmit}
          setUpdateModal={setUpdateModal}
        />
      )}

      {detailsModal.visible && (
        <DetailsModal
          selectedComplaint={detailsModal.complaint}
          closeDetailsModal={closeDetailsModal}
        />
      )}
    </div>
  );
}
