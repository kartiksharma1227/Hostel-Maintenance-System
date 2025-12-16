// import React, { useState } from "react";
// import ComplaintsTable from "./ComplaintsTable";
// import ComplaintDetailsModal from "../modals/ComplaintDetailsModal";
// import axios from "axios";

// const Complaints = ({ complaints, handleAssignEngineer }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [complaintDetailsModal, setComplaintDetailsModal] = useState({
//     visible: false,
//     complaint: null,
//   });
// // /complaints/with-assignees/:id
//   const handleViewComplaintDetails = async (complaintId) => {
//     try {
//       const response = await axios.get(`http://localhost:4000/api/admin/complaints/with-assignees/${complaintId}`);
//       setComplaintDetailsModal({
//         visible: true,
//         complaint: response.data,
//       });

//     } catch (error) {
//       console.error("Failed to fetch complaint details:", error);
//     }
//   };

//   return (
//     <div className="admin-dashboard-complaints-container">
//       <div className="admin-dashboard-section-header">
//         <h2 className="admin-dashboard-section-title">Maintenance Complaints</h2>
//         <p className="admin-dashboard-section-subtitle">
//           Manage and track all maintenance requests from students
//         </p>
//       </div>

//       <div className="admin-dashboard-card">
//         <ComplaintsTable
//           complaints={complaints}
//           handleViewDetails={handleViewComplaintDetails}
//           handleAssignEngineer={handleAssignEngineer}
//           searchQuery={searchQuery}
//           statusFilter={statusFilter}
//           onSearchChange={setSearchQuery}
//           onStatusFilterChange={setStatusFilter}
//         />
//       </div>

//       {complaintDetailsModal.visible && complaintDetailsModal.complaint && (
//         <div className="admin-dashboard-modal-overlay">
//           <ComplaintDetailsModal
//             complaint={complaintDetailsModal.complaint}
//             onClose={() =>
//               setComplaintDetailsModal({ visible: false, complaint: null })
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Complaints;

import React, { useState, useEffect } from "react";
import ComplaintsTable from "./ComplaintsTable";
import ComplaintDetailsModal from "../modals/ComplaintDetailsModal";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constants";

const Complaints = ({ handleAssignEngineer }) => {
  const [complaints, setComplaints] = useState([]);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(25);
  const [complaintDetailsModal, setComplaintDetailsModal] = useState({
    visible: false,
    complaint: null,
  });

  // fetch complaints whenever filters change
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/admin/complaints`, {
          params: {
            status: statusFilter,
            search: searchQuery,
            page: currentPage,
            limit: recordsPerPage,
          },
        });
        setComplaints(res.data.complaints);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Error fetching complaints:", err);
      }
    };
    fetchComplaints();
  }, [statusFilter, searchQuery, currentPage, recordsPerPage]);

  const handleViewComplaintDetails = async (complaintId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/admin/complaints/with-assignees/${complaintId}`
      );
      setComplaintDetailsModal({
        visible: true,
        complaint: response.data,
      });
    } catch (error) {
      console.error("Failed to fetch complaint details:", error);
    }
  };

  return (
    <div className="admin-dashboard-complaints-container">
      <div className="admin-dashboard-section-header">
        <h2 className="admin-dashboard-section-title">
          Maintenance Complaints
        </h2>
        <p className="admin-dashboard-section-subtitle">
          Manage and track all maintenance requests from students
        </p>
      </div>

      <div className="admin-dashboard-card">
        <ComplaintsTable
          complaints={complaints}
          total={total}
          handleViewDetails={handleViewComplaintDetails}
          handleAssignEngineer={handleAssignEngineer}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          onSearchChange={setSearchQuery}
          onStatusFilterChange={setStatusFilter}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          recordsPerPage={recordsPerPage}
          onRecordsPerPageChange={setRecordsPerPage}
        />
      </div>

      {complaintDetailsModal.visible && complaintDetailsModal.complaint && (
        <div className="admin-dashboard-modal-overlay">
          <ComplaintDetailsModal
            complaint={complaintDetailsModal.complaint}
            onClose={() =>
              setComplaintDetailsModal({ visible: false, complaint: null })
            }
          />
        </div>
      )}
    </div>
  );
};

export default Complaints;
