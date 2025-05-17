import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const FeedbackModal = ({ isVisible, complaintId, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ complaintId, rating, feedback });
  };

  return (
    <div className="feedback-modal">
      <div className="feedback-modal-content">
        <h3>Share Your Feedback</h3>
        <p>How satisfied are you with the maintenance service?</p>

        <form onSubmit={handleSubmit}>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="star-label"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
              >
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={rating === star}
                  onChange={() => setRating(star)}
                />
                <FaStar
                  className="star"
                  style={{
                    color:
                      star <= (hoveredRating || rating) ? "#ffc107" : "#d4d4d4",
                  }}
                />
              </label>
            ))}
          </div>

          <textarea
            placeholder="Share your experience (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={!rating}>
              Submit Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
