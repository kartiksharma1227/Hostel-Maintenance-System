import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaMapMarkerAlt, FaClock, FaChevronRight, FaEye,FaStar } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const RecentComplaints = ({ onComplaintClick, onFeedback}) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setError("Authentication error — no token found");
          setLoading(false);
          return;
        }

        let decodedToken;
        try {
          decodedToken = jwtDecode(token);
        } catch (err) {
          console.error("Invalid token:", err);
          setError("Authentication error — invalid token");
          setLoading(false);
          return;
        }

        const roll_number = decodedToken.roll_number;
        console.log("Fetching complaints for roll number on home page:", roll_number);

        const res = await axios.get("/api/recent-complaints", {
          params: { roll_number },
          headers: { Authorization: `Bearer ${token}` },
        });

        setComplaints(res.data);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setError("Could not load recent complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-badge pending";
      case "in-progress":
        return "status-badge in-progress";
      case "completed":
        return "status-badge completed";
      default:
        return "status-badge";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getPriorityClass = (priority) =>
    `priority-indicator ${priority.toLowerCase()}`;

  const truncateText = (text, maxLength = 100) =>
    text.length <= maxLength ? text : text.substring(0, maxLength) + "...";

  if (loading) {
    return (
      <div className="recent-complaints">
        <p>Loading recent complaints…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-complaints">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="recent-complaints">
      <div className="section-header">
        <h3>Recent Complaints</h3>
        {complaints.length > 0 && (
          <button className="view-all-btn">
            View All <FaChevronRight className="arrow-icon" />
          </button>
        )}
      </div>

      {complaints.length > 0 ? (
        <div className="complaints-grid">
          {complaints.map((complaint) => (
            <div
              key={complaint.id}
              className="complaint-card enhanced"
              onClick={() => onComplaintClick(complaint)}
            >
              <div className="card-header">
                <div className="category-indicator">{complaint.category}</div>
                <span className={getStatusBadgeClass(complaint.status)}>
                  {complaint.status}
                </span>
              </div>

              <h4 className="complaint-title">{complaint.title}</h4>
              <p className="complaint-excerpt">
                {truncateText(complaint.description)}
              </p>

              <div className="card-footer">
                <div className="complaint-meta">
                  <span>
                    <FaMapMarkerAlt className="meta-icon" />
                    {complaint.location}
                  </span>
                  <span>
                    <FaClock className="meta-icon" />
                    {formatDate(complaint.createdAt)}
                  </span>
                </div>
                <div className={getPriorityClass(complaint.priority)}>
                  {complaint.priority}
                </div>
              </div>

              <div className="card-action">
                <button className="view-details-btn">
                  <FaEye /> View Details
                </button>
{complaint.status?.toLowerCase() === "completed" && (
  <div className="action-buttons" style={{ marginTop: "6px" }}>
    {complaint.rating ? (
      <div className="submitted-feedback">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            <FaStar
              color={index < complaint.rating ? "gold" : "#ccc"}
              size={16}
              style={{ marginRight: "2px" }}
            />
          </span>
        ))}
      </div>
    ) : (
      <button
        className="action-btn feedback-btn"
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click
          onFeedback(complaint); // Trigger feedback modal
        }}
      >
        📝 Give Feedback
      </button>
    )}
  </div>
)}

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">📋</div>
          <p>No complaints found</p>
          <button className="new-complaint-btn">File a New Complaint</button>
        </div>
      )}
      
    </div>
   

  );
};

export default RecentComplaints;
