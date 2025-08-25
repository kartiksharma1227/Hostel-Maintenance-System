// import React, { useState, useEffect } from "react";

// const ComplaintsTable = ({
//   complaints,
//   handleViewDetails,
//   handleAssignEngineer,
//   searchQuery,
//   statusFilter,
//   onSearchChange,
//   onStatusFilterChange,
// }) => {
//   // Added pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [recordsPerPage, setRecordsPerPage] = useState(25);

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, statusFilter]);

//   const filteredComplaints = complaints.filter((complaint) => {

//     const matchesSearch =
//       (complaint.title || "")
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       (complaint.category || "")
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       (complaint.location || "")
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase()) ||
//       (complaint.submitted_by || "")
//         .toLowerCase()
//         .includes(searchQuery.toLowerCase());

//     const matchesStatus =
//       statusFilter === "all" ||
//       (complaint.status || "").toLowerCase().replace(" ", "-") === statusFilter;

//     return matchesSearch && matchesStatus;
//   });

//   // Calculate pagination
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = filteredComplaints.slice(
//     indexOfFirstRecord,
//     indexOfLastRecord
//   );
//   const totalPages = Math.ceil(filteredComplaints.length / recordsPerPage);

//   // Handle pagination navigation
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const isoString = dateString.replace(" ", "T");
//     const date = new Date(isoString);
//     return date.toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//       hour12: true,
//     });
//   };

//   // Function to determine priority color
//   const getPriorityBadge = (category) => {
//     const priorityMap = {
//       Electrical: { color: "#EF4444", label: "High" },
//       Plumbing: { color: "#F59E0B", label: "Medium" },
//       Furniture: { color: "#10B981", label: "Low" },
//       Internet: { color: "#3B82F6", label: "Medium" },
//       Housekeeping: { color: "#8B5CF6", label: "Low" },
//     };

//     const defaultPriority = { color: "#6B7280", label: "Normal" };
//     return priorityMap[category] || defaultPriority;
//   };

//   // Function to render the status badge with appropriate colors
//   const renderStatusBadge = (status) => {
//     const statusClass = status ? status.toLowerCase().replace(" ", "-") : "";
//     return (
//       <span className={`admin-dashboard-badge ${statusClass}`}>
//         {status || "Unknown"}
//       </span>
//     );
//   };

//   return (
//     <div className="admin-dashboard-complaints-section">
//       <div className="admin-dashboard-filters-container">
//         <div className="admin-dashboard-input-icon-wrapper">
//           <span className="admin-dashboard-input-icon">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//           </span>
//           <input
//             type="text"
//             placeholder="Search by title, category, location or submitter..."
//             className="admin-dashboard-search-input"
//             value={searchQuery}
//             onChange={(e) => onSearchChange(e.target.value)}
//           />
//         </div>

//         <select
//           className="admin-dashboard-filter-select"
//           value={statusFilter}
//           onChange={(e) => onStatusFilterChange(e.target.value)}
//         >
//           <option value="all">All Statuses</option>
//           <option value="pending">Pending</option>
//           <option value="in-progress">In Progress</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       {filteredComplaints.length === 0 ? (
//         <div className="admin-dashboard-empty-state">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="48"
//             height="48"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="1"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             style={{ color: "#6b7280", marginBottom: "1rem" }}
//           >
//             <circle cx="12" cy="12" r="10"></circle>
//             <line x1="8" y1="15" x2="16" y2="15"></line>
//             <line x1="9" y1="9" x2="9.01" y2="9"></line>
//             <line x1="15" y1="9" x2="15.01" y2="9"></line>
//           </svg>
//           <p className="admin-dashboard-empty-text">
//             No complaints found matching your filters
//           </p>
//           <button
//             className="admin-dashboard-btn"
//             onClick={() => {
//               onStatusFilterChange("all");
//               onSearchChange("");
//             }}
//             style={{ backgroundColor: "#3f51b5", color: "white" }}
//           >
//             Reset Filters
//           </button>
//         </div>
//       ) : (
//         <>
//           <div className="admin-dashboard-table-responsive">
//             <table className="admin-dashboard-table">
//               <thead>
//                 <tr>
//                   <th>#ID</th>
//                   <th>Title & Description</th>
//                   <th>Submitted By</th>
//                   <th>Category</th>
//                   <th>Location</th>
//                   <th>Status</th>
//                   <th>Submitted On</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentRecords.map((complaint) => {
//                   const priority = getPriorityBadge(complaint.category);
//                   return (
//                     <tr key={complaint.id}>
//                       <td>#{complaint.id}</td>
//                       <td className="admin-dashboard-title-cell">
//                         <div style={{ fontWeight: "500" }}>
//                           {complaint.title}
//                         </div>
//                         <div
//                           style={{
//                             fontSize: "12px",
//                             color: "#6b7280",
//                             marginTop: "4px",
//                           }}
//                         >
//                           {complaint.description
//                             ? complaint.description.length > 60
//                               ? `${complaint.description.substring(0, 60)}...`
//                               : complaint.description
//                             : "No description available"}
//                         </div>
//                       </td>
//                       <td>
//                         <div>{complaint.submitted_by || "Unknown"}</div>
//                         <div style={{ fontSize: "12px", color: "#6b7280" }}>
//                           {complaint.room_id ? `Room ${complaint.room_id}` : ""}
//                         </div>
//                       </td>
//                       <td>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: "4px",
//                           }}
//                         >
//                           <span className="admin-dashboard-category-badge">
//                             {complaint.category}
//                           </span>
//                           <span
//                             style={{
//                               fontSize: "11px",
//                               color: priority.color,
//                               fontWeight: "500",
//                               display: "flex",
//                               alignItems: "center",
//                               gap: "4px",
//                             }}
//                           >
//                             <span
//                               style={{
//                                 width: "8px",
//                                 height: "8px",
//                                 borderRadius: "50%",
//                                 backgroundColor: priority.color,
//                                 display: "inline-block",
//                               }}
//                             ></span>
//                             {priority.label} Priority
//                           </span>
//                         </div>
//                       </td>
//                       <td>{complaint.location}</td>
//                       <td>{renderStatusBadge(complaint.status)}</td>
//                       <td>
//                         <div style={{ whiteSpace: "nowrap" }}>
//                           {formatDate(complaint.created_at)}
//                         </div>
//                       </td>
//                       <td>
//                         <div className="admin-dashboard-action-buttons">
//                           <button
//                             className="admin-dashboard-btn admin-dashboard-view-btn"
//                             onClick={() => handleViewDetails(complaint.id)}
//                             title="View Details"
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               width="16"
//                               height="16"
//                               viewBox="0 0 24 24"
//                               fill="none"
//                               stroke="currentColor"
//                               strokeWidth="2"
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               style={{ marginRight: "4px" }}
//                             >
//                               <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//                               <circle cx="12" cy="12" r="3"></circle>
//                             </svg>
//                             View
//                           </button>

//                           {complaint.assignmentStatus !== "Accepted" &&
//                             complaint.status !== "Completed" && (
//                               <button
//                                 className="admin-dashboard-btn admin-dashboard-assign-btn"
//                                 onClick={() =>
//                                   handleAssignEngineer(complaint.id)
//                                 }
//                                 title="Assign Engineer"
//                               >
//                                 <svg
//                                   xmlns="http://www.w3.org/2000/svg"
//                                   width="16"
//                                   height="16"
//                                   viewBox="0 0 24 24"
//                                   fill="none"
//                                   stroke="currentColor"
//                                   strokeWidth="2"
//                                   strokeLinecap="round"
//                                   strokeLinejoin="round"
//                                   style={{ marginRight: "4px" }}
//                                 >
//                                   <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//                                   <circle cx="8.5" cy="7" r="4"></circle>
//                                   <line x1="20" y1="8" x2="20" y2="14"></line>
//                                   <line x1="23" y1="11" x2="17" y2="11"></line>
//                                 </svg>
//                                 Assign
//                               </button>
//                             )}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination controls */}
//           <div className="admin-dashboard-pagination">
//             <div className="admin-dashboard-records-per-page">
//               <span>Show:</span>
//               <select
//                 value={recordsPerPage}
//                 onChange={(e) => {
//                   setRecordsPerPage(Number(e.target.value));
//                   setCurrentPage(1);
//                 }}
//               >
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//               <span>records per page</span>
//             </div>

//             <div className="admin-dashboard-pagination-info">
//               Showing <strong>{indexOfFirstRecord + 1}</strong> to{" "}
//               <strong>
//                 {Math.min(indexOfLastRecord, filteredComplaints.length)}
//               </strong>{" "}
//               of <strong>{filteredComplaints.length}</strong> entries
//             </div>

//             <div className="admin-dashboard-pagination-controls">
//               <button
//                 onClick={prevPage}
//                 disabled={currentPage === 1}
//                 className="admin-dashboard-pagination-btn"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   style={{ marginRight: "4px" }}
//                 >
//                   <polyline points="15 18 9 12 15 6"></polyline>
//                 </svg>
//                 Prev
//               </button>

//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 // Show pages around current page
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (currentPage <= 3) {
//                   pageNum = i + 1;
//                 } else if (currentPage > totalPages - 3) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = currentPage - 2 + i;
//                 }

//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => paginate(pageNum)}
//                     className={`admin-dashboard-pagination-btn ${
//                       currentPage === pageNum ? "active" : ""
//                     }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               <button
//                 onClick={nextPage}
//                 disabled={currentPage === totalPages}
//                 className="admin-dashboard-pagination-btn"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   style={{ marginRight: "4px" }}
//                 >
//                   <polyline points="9 18 15 12 9 6"></polyline>
//                 </svg>
//                 Next
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ComplaintsTable;


import React from "react";

const ComplaintsTable = ({
  complaints,
  total,
  handleViewDetails,
  handleAssignEngineer,
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  currentPage,
  onPageChange,
  recordsPerPage,
  onRecordsPerPageChange,
}) => {
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const totalPages = Math.ceil(total / recordsPerPage);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const isoString = dateString.replace(" ", "T");
    const date = new Date(isoString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const getPriorityBadge = (category) => {
    const priorityMap = {
      Electrical: { color: "#EF4444", label: "High" },
      Plumbing: { color: "#F59E0B", label: "Medium" },
      Furniture: { color: "#10B981", label: "Low" },
      Internet: { color: "#3B82F6", label: "Medium" },
      Housekeeping: { color: "#8B5CF6", label: "Low" },
    };
    const defaultPriority = { color: "#6B7280", label: "Normal" };
    return priorityMap[category] || defaultPriority;
  };

  const renderStatusBadge = (status) => {
    const statusClass = status ? status.toLowerCase().replace(" ", "-") : "";
    return (
      <span className={`admin-dashboard-badge ${statusClass}`}>
        {status || "Unknown"}
      </span>
    );
  };

  return (
    <div className="admin-dashboard-complaints-section">
      {/* Filters */}
      <div className="admin-dashboard-filters-container">
        <div className="admin-dashboard-input-icon-wrapper">
          <span className="admin-dashboard-input-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by title, category, location or submitter..."
            className="admin-dashboard-search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <select
          className="admin-dashboard-filter-select"
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {complaints.length === 0 ? (
        <div className="admin-dashboard-empty-state">
          <p>No complaints found matching your filters</p>
          <button
            className="admin-dashboard-btn"
            onClick={() => {
              onStatusFilterChange("all");
              onSearchChange("");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <div className="admin-dashboard-table-responsive">
            <table className="admin-dashboard-table">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th>Title & Description</th>
                  <th>Submitted By</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => {
                  const priority = getPriorityBadge(complaint.category);
                  return (
                    <tr key={complaint.id}>
                      <td>#{complaint.id}</td>
                      <td>
                        <div style={{ fontWeight: "500" }}>
                          {complaint.title}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          {complaint.description
                            ? complaint.description.length > 60
                              ? `${complaint.description.substring(0, 60)}...`
                              : complaint.description
                            : "No description available"}
                        </div>
                      </td>
                      <td>
                        <div>{complaint.submitted_by || "Unknown"}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          {complaint.room_id ? `Room ${complaint.room_id}` : ""}
                        </div>
                      </td>
                      <td>
                        <span className="admin-dashboard-category-badge">
                          {complaint.category}
                        </span>
                        <span
                          style={{
                            fontSize: "11px",
                            color: priority.color,
                            fontWeight: "500",
                          }}
                        >
                          ● {priority.label} Priority
                        </span>
                      </td>
                      <td>{complaint.location}</td>
                      <td>{renderStatusBadge(complaint.status)}</td>
                      <td>{formatDate(complaint.created_at)}</td>
                      <td>
                        <button
                          className="admin-dashboard-btn admin-dashboard-view-btn"
                          onClick={() => handleViewDetails(complaint.id)}
                        >
                          View
                        </button>
                        {complaint.assignmentStatus !== "Accepted" &&
                          complaint.status !== "Completed" && (
                            <button
                              className="admin-dashboard-btn admin-dashboard-assign-btn"
                              onClick={() => handleAssignEngineer(complaint.id)}
                            >
                              Assign
                            </button>
                          )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          <div className="admin-dashboard-pagination">
            <div>
              Show:{" "}
              <select
                value={recordsPerPage}
                onChange={(e) =>
                  onRecordsPerPageChange(Number(e.target.value))
                }
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>{" "}
              records per page
            </div>

            <div>
              Showing <strong>{indexOfFirstRecord + 1}</strong> to{" "}
              <strong>{Math.min(indexOfLastRecord, total)}</strong> of{" "}
              <strong>{total}</strong> entries
            </div>

            <div>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ComplaintsTable;
