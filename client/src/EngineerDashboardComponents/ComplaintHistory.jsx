// // src/EngineerDashBoardComponents/ComplaintHistory.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ComplaintHistory = ({ getCategoryIcon, handleViewDetails }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/complaint-history", {
//           params: { status: "completed", category: "all", search: "" },
//         });
//         setComplaints(response.data);
//       } catch (error) {
//         console.error("Error fetching complaints:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredComplaints = complaints.filter((complaint) => {
//     const query = searchQuery.toLowerCase();
//     return (
//       complaint.status === "completed" &&
//       (complaint.title.toLowerCase().includes(query) ||
//         complaint.category.toLowerCase().includes(query) ||
//         complaint.location.toLowerCase().includes(query) ||
//         (complaint.studentName || "").toLowerCase().includes(query))
//     );
//   });

//   const formatDate = (dateStr) => {
//     if (!dateStr) return "";
//     const iso = dateStr.replace(" ", "T");
//     const d = new Date(iso);
//     return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
//   };

//   if (isLoading) return <p>Loading complaints...</p>;

//   return (
//     <div className="engineer-complaint-history">
//       <h2>Completed Complaints History</h2>
//       <div className="engineer-complaint-filters">
//         <input
//           type="text"
//           placeholder="Search completed complaints..."
//           className="engineer-search-input"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {filteredComplaints.length === 0 ? (
//         <div className="engineer-no-results">
//           <p>No completed complaints found</p>
//         </div>
//       ) : (
//         <table className="engineer-complaints-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Title</th>
//               <th>Category</th>
//               <th>Location</th>
//               <th>Completion Date</th>
//               <th>Feedback</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredComplaints.map((complaint) => (
//               <tr key={complaint.id}>
//                 <td>#{complaint.id}</td>
//                 <td>{complaint.title}</td>
//                 <td>
//                   <span className="engineer-category-label">
//                     <span className="engineer-category-icon">
//                       {getCategoryIcon(complaint.category)}
//                     </span>
//                     {complaint.category}
//                   </span>
//                 </td>
//                 <td>{complaint.location}</td>
//                 <td>{formatDate(complaint.updated_at || complaint.created_at)}</td>
//                 <td>
//                   <div className="engineer-feedback-display">
//                     <div className="engineer-star-rating">
//                       {[...Array(5)].map((_, i) => (
//                         <span
//                           key={i}
//                           className={
//                             i < (complaint.rating || 0)
//                               ? "engineer-star filled"
//                               : "engineer-star"
//                           }
//                         >
//                           ★
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <button
//                     className="engineer-action-btn engineer-view-btn"
//                     onClick={() => handleViewDetails(complaint)}
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ComplaintHistory;



// src/EngineerDashBoardComponents/ComplaintHistory.jsx
import React from "react";

const ComplaintHistory = ({
  completedComplaints,
  searchQuery,
  setSearchQuery,
  getCategoryIcon,
  handleViewDetails,
}) => {
  const filteredComplaints = completedComplaints.filter((complaint) => {
    const query = searchQuery.toLowerCase();
    return (
      complaint.title.toLowerCase().includes(query) ||
      complaint.category.toLowerCase().includes(query) ||
      complaint.location.toLowerCase().includes(query) ||
      (complaint.studentName || "").toLowerCase().includes(query)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const iso = dateStr.replace(" ", "T");
    const d = new Date(iso);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString();
  };

  return (
    <div className="engineer-complaint-history">
      <h2>Completed Complaints History</h2>
      <div className="engineer-complaint-filters">
        <input
          type="text"
          placeholder="Search completed complaints..."
          className="engineer-search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredComplaints.length === 0 ? (
        <div className="engineer-no-results">
          <p>No completed complaints found</p>
        </div>
      ) : (
        <table className="engineer-complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Completion Date</th>
              <th>Feedback</th>
              <th>Action</th>
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
                <td>{formatDate(complaint.completedDate || complaint.updated_at)}</td>
                <td>
                  <div className="engineer-feedback-display">
                    <div className="engineer-star-rating">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < (complaint.rating || 0)
                              ? "engineer-star filled"
                              : "engineer-star"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td>
                  <button
                    className="engineer-action-btn engineer-view-btn"
                    onClick={() => handleViewDetails(complaint)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComplaintHistory;
