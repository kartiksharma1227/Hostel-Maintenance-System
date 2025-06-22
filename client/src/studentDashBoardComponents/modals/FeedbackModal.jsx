import React, { useState, useEffect } from "react";
import { FaStar, FaSmile, FaTimes } from "react-icons/fa";
import "../../styles/FeedbackModal.css";

const FeedbackModal = ({ isVisible, complaintId, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isVisible) {
      // Small delay to allow close animation
      const timer = setTimeout(() => {
        setRating(0);
        setFeedback("");
        setHoveredRating(0);
        setIsSubmitting(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay for better UX
    setTimeout(() => {
      onSubmit({ complaintId, rating, feedback });
      setIsSubmitting(false);
    }, 500);
  };

  const getRatingText = () => {
    const texts = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
    return hoveredRating > 0 ? texts[hoveredRating] : texts[rating];
  };

  return (
    <div className="studentdashboard-feedback-modal">
      <div className="studentdashboard-feedback-modal-content">
        <button
          className="studentdashboard-feedback-close-btn"
          onClick={onClose}
          aria-label="Close feedback form"
        >
          <FaTimes />
        </button>

        <div className="studentdashboard-feedback-header">
          <FaSmile className="studentdashboard-feedback-header-icon" />
          <h3>Share Your Feedback</h3>
        </div>

        <p>How satisfied are you with the maintenance service?</p>

        <form onSubmit={handleSubmit}>
          <div className="studentdashboard-feedback-rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <label
                key={star}
                className="studentdashboard-feedback-star-label"
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
                  className={`studentdashboard-feedback-star ${
                    star <= (hoveredRating || rating) ? "selected" : ""
                  }`}
                />
              </label>
            ))}
          </div>

          {(rating > 0 || hoveredRating > 0) && (
            <div className="studentdashboard-feedback-rating-text">
              {getRatingText()}
            </div>
          )}

          <textarea
            className="studentdashboard-feedback-textarea"
            placeholder="Share your experience and suggestions (optional)"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows="4"
          />

          <div className="studentdashboard-feedback-modal-actions">
            <button
              type="button"
              className="studentdashboard-feedback-cancel-btn"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="studentdashboard-feedback-submit-btn"
              disabled={!rating || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
