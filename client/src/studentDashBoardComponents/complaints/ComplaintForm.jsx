// File: Dbms1/src/studentDashBoardComponents/complaints/ComplaintForm.jsx

import React, { useState } from "react";
import { FaTools, FaUpload } from "react-icons/fa";
import {
  COMPLAINT_CATEGORIES,
  PRIORITY_LEVELS,
  FILE_UPLOAD_CONFIG,
} from "../../utils/constants";
import "../../styles/ComplaintForm.css";
import { use } from "react";

export default function ComplaintForm({ onSubmitSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "Low",
    location: "",
    description: "",
    agreed: false,
    images: [],
  });
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    const valid = selected.filter(
      (f) =>
        FILE_UPLOAD_CONFIG.acceptedTypes.includes(f.type) &&
        f.size <= FILE_UPLOAD_CONFIG.maxSize
    );
    if (valid.length + files.length > FILE_UPLOAD_CONFIG.maxFiles) {
      setErrors({ files: `Max ${FILE_UPLOAD_CONFIG.maxFiles} files allowed` });
      return;
    }
    setFiles((prev) => [...prev, ...valid]);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...valid] }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange({ target: { files: e.dataTransfer.files } });
  };
  const removeFile = (i) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== i),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // simple front-end validation
    const errs = {};
    ["title", "category", "description"].forEach((f) => {
      if (!formData[f]) errs[f] = "Required";
    });
    if (!formData.agreed) errs.agreed = "You must confirm accuracy";
    if (Object.keys(errs).length) {
      console.warn("Validation errors:", errs); // Log validation errors
      setErrors(errs);
      return;
    }

    const userPk = localStorage.getItem("user_PK");
    const roll_number = localStorage.getItem("roll_number");
    const room_FK = localStorage.getItem("room_FK");
    const location = room_FK.toString()[0]

    // build payload
    const payload = {
      room_FK: room_FK,
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      location: location,
      description: formData.description,
      submitted_by: roll_number,
    };

    console.log("Form data to be submitted:", payload); // Log the form data

    try {
      const res = await fetch("http://localhost:4000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Handle response from backend
      if (!res.ok) throw new Error(res.statusText);
      const result = await res.json();

      console.log("Complaint submitted successfully:", result); // Log the successful response

      // success callback
      onSubmitSuccess && onSubmitSuccess(result);

      // Reset the form data only on success
      setFormData({
        title: "",
        category: "",
        priority: "Low",
        location: "",
        description: "",
        agreed: false,
        images: [],
      });
      setFiles([]);
      setErrors({});
    } catch (err) {
      console.error("Submit error:", err);
      setErrors({ submit: "Submission failed, try again." });
    }
  };

  return (
    <div className="file-complaint">
      <form className="complaint-form enhanced" onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="form-icon">
            <FaTools />
          </div>
          <div className="form-heading">
            <h3>File New Complaint</h3>
            <p>Please provide the details of your maintenance request</p>
          </div>
        </div>

        <div className="form-divider">
          <span className="divider-text">Basic Details</span>
        </div>

        <div className="form-group">
          <label>
            Title <span className="required-badge">Required</span>
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input-enhanced"
            placeholder="Brief title"
          />
          {errors.title && (
            <span className="error-message">{errors.title}</span>
          )}
        </div>

        <div className="form-group">
          <label>
            Category <span className="required-badge">Required</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="select-enhanced"
          >
            <option value="">--Select--</option>
            {COMPLAINT_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="error-message">{errors.category}</span>
          )}
        </div>

        {/* <div className="form-group">
          <label>
            Room Number <span className="required-badge">Required</span>
          </label>
          <input
            type="number"
            name="location"
            min="1"
            value={formData.location}
            onChange={handleChange}
            className="input-enhanced"
            placeholder="e.g., 201"
          />
          {errors.location && (
            <span className="error-message">{errors.location}</span>
          )}
        </div> */}

        <div className="form-divider">
          <span className="divider-text">Priority & Description</span>
        </div>

        <div className="form-group">
          <label className="label-text">
            Priority <span className="required-badge">Required</span>
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="select-enhanced"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            Description <span className="required-badge">Required</span>
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="textarea-enhanced"
            placeholder="Detailed description"
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="terms-checkbox">
          <input
            type="checkbox"
            name="agreed"
            checked={formData.agreed}
            onChange={handleChange}
          />
          I confirm the information is accurate
        </div>
        {errors.agreed && (
          <span className="error-message">{errors.agreed}</span>
        )}

        <div className="form-actions enhanced">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Submit Complaint
          </button>
        </div>
        {errors.submit && <p className="error-message">{errors.submit}</p>}
      </form>
    </div>
  );
}
