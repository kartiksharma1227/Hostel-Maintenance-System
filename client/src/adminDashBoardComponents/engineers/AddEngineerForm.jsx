import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // or use any icon set you're using

const AddEngineerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    mail_UN: "",
    role: "engineer",
    phone_number: "",
    availability: "1", // keep as string for the <select>
    specialization: "",
    years_of_experience: "", // keep as string for the <input>
    address: "",
    password: "",
  });
   const [showPassword, setShowPassword] = useState(false); // ✅ add this line

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert numeric fields before sending
    const payload = {
      ...formData,
      // availability: Number(formData.availability),
      years_of_experience: Number(formData.years_of_experience),
    };

    onSubmit(payload);
  };

  return (
    <div className="admin-dashboard-add-engineer-container">
      <div className="admin-dashboard-section-header">
        <h2 className="admin-dashboard-section-title">Add New Engineer</h2>
        <p className="admin-dashboard-section-subtitle">
          Create a new maintenance engineer account
        </p>
      </div>

      <div className="admin-dashboard-card">
        <form onSubmit={handleSubmit} className="admin-dashboard-form">
          <div className="admin-dashboard-form-row">
            <div className="admin-dashboard-form-group">
              <label htmlFor="name" className="admin-dashboard-form-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                className="admin-dashboard-form-control"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="admin-dashboard-form-group">
              <label htmlFor="mail_UN" className="admin-dashboard-form-label">
                Email Address
              </label>
              <input
                id="mail_UN"
                name="mail_UN"
                type="email"
                className="admin-dashboard-form-control"
                value={formData.mail_UN}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="admin-dashboard-form-row">
            <div className="admin-dashboard-form-group">
              <label
                htmlFor="years_of_experience"
                className="admin-dashboard-form-label"
              >
                Years of Experience
              </label>
              <input
                id="years_of_experience"
                name="years_of_experience"
                type="number"
                className="admin-dashboard-form-control"
                min="0"
                value={formData.years_of_experience}
                onChange={handleInputChange}
                placeholder="Enter years of experience"
                required
              />
            </div>

            <div className="admin-dashboard-form-group">
              <label
                htmlFor="phone_number"
                className="admin-dashboard-form-label"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                className="admin-dashboard-form-control"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="admin-dashboard-form-row">
            <div className="admin-dashboard-form-group">
              <label
                htmlFor="specialization"
                className="admin-dashboard-form-label"
              >
                Specialization
              </label>
              <input
                id="specialization"
                name="specialization"
                className="admin-dashboard-form-control"
                value={formData.specialization}
                onChange={handleInputChange}
                placeholder="e.g. Electrical, Plumbing, etc."
                required
              />
            </div>

            {/* <div className="admin-dashboard-form-row">
              <div className="admin-dashboard-form-group">
                <label
                  htmlFor="years_of_experience"
                  className="admin-dashboard-form-label"
                >
                  Years of Experience
                </label>
                <input
                  id="years_of_experience"
                  name="years_of_experience"
                  type="number"
                  className="admin-dashboard-form-control"
                  min="0"
                  value={formData.years_of_experience}
                  onChange={handleInputChange}
                  placeholder="Enter years of experience"
                  required
                />
              </div>
            </div> */}
            <div className="admin-dashboard-form-row">
              <div
                className="admin-dashboard-form-group"
                style={{ position: "relative" }}
              >
                <label
                  htmlFor="password"
                  className="admin-dashboard-form-label"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="admin-dashboard-form-control"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    top: "74%",
                    right: "12px",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="admin-dashboard-form-group">
            <label htmlFor="address" className="admin-dashboard-form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className="admin-dashboard-form-control admin-dashboard-textarea"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter full address"
              rows="3"
              required
            />
          </div>

          <div className="admin-dashboard-form-actions">
            <button
              type="submit"
              className="admin-dashboard-btn admin-dashboard-submit-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "8px" }}
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Add Engineer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEngineerForm;
