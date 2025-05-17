// File: Dbms1/src/studentDashBoardComponents/complaints/ComplaintHistory.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const ComplaintHistory = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/complaint-history", {
          params: {
            status: "all",
            category: "all",
            search: "",
          },
        });
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (isLoading) return <p>Loading complaints...</p>;

  if (complaints.length === 0) return <p>No complaints found.</p>;

  return (
    <div>
      <h2>Complaint History</h2>
      {complaints.map((c) => (
        <div key={c.id}>
          <p>Title: {c.title}</p>
          <p>Description: {c.description}</p>
          <p>Status: {c.status}</p>
          <p>Category: {c.category}</p>
          <p>Location: {c.location}</p>
          <p>Priority: {c.priority}</p>
          <p>Created At: {new Date(c.created_at || c.createdAt).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ComplaintHistory;
