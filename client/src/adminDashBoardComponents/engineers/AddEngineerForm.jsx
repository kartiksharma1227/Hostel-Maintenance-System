import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "../../styles/AddEngineerForm.css";

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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="admindashboard-add-engineer-container">
      <div className="admindashboard-add-engineer-section-header">
        <h2 className="admindashboard-add-engineer-section-title">
          Add New Engineer
        </h2>
        <p className="admindashboard-add-engineer-section-subtitle">
          Create a new maintenance engineer account
        </p>
      </div>

      <div className="admindashboard-add-engineer-card">
        <form
          onSubmit={handleSubmit}
          className="admindashboard-add-engineer-form"
        >
          <div className="admindashboard-add-engineer-form-row">
            <div className="admindashboard-add-engineer-form-group">
              <label
                htmlFor="name"
                className="admindashboard-add-engineer-form-label"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                className="admindashboard-add-engineer-form-control"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="admindashboard-add-engineer-form-group">
              <label
                htmlFor="mail_UN"
                className="admindashboard-add-engineer-form-label"
              >
                Email Address
              </label>
              <input
                id="mail_UN"
                name="mail_UN"
                type="email"
                className="admindashboard-add-engineer-form-control"
                value={formData.mail_UN}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </div>
          </div>

          <div className="admindashboard-add-engineer-form-row">
            <div className="admindashboard-add-engineer-form-group">
              <label
                htmlFor="years_of_experience"
                className="admindashboard-add-engineer-form-label"
              >
                Years of Experience
              </label>
              <input
                id="years_of_experience"
                name="years_of_experience"
                type="number"
                className="admindashboard-add-engineer-form-control"
                min="0"
                value={formData.years_of_experience}
                onChange={handleInputChange}
                placeholder="Enter years of experience"
                required
              />
            </div>

            <div className="admindashboard-add-engineer-form-group">
              <label
                htmlFor="phone_number"
                className="admindashboard-add-engineer-form-label"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                className="admindashboard-add-engineer-form-control"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="admindashboard-add-engineer-form-row">
            <div className="admindashboard-add-engineer-form-group">
              <label
                htmlFor="specialization"
                className="admindashboard-add-engineer-form-label"
              >
                Specialization
              </label>
              <select
                id="specialization"
                name="specialization"
                className="admindashboard-add-engineer-form-control"
                value={formData.specialization}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>
                  Select specialization
                </option>
                <option value="Electrical">Electrical</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Carpentry">Carpentry</option>
                <option value="HVAC">HVAC</option>
                <option value="Cleaning">Cleaning</option>
                <option value="Internet">Internet</option>
                <option value="Others">Others</option>
              </select>
            </div>{" "}
            <div className="admindashboard-add-engineer-form-group">
              <label
                htmlFor="password"
                className="admindashboard-add-engineer-form-label"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="admindashboard-add-engineer-form-control"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="admindashboard-add-engineer-password-toggle"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="admindashboard-add-engineer-form-group">
            <label
              htmlFor="address"
              className="admindashboard-add-engineer-form-label"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className="admindashboard-add-engineer-form-control admindashboard-add-engineer-textarea"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter full address"
              rows="3"
              required
            />
          </div>

          <div className="admindashboard-add-engineer-form-actions">
            <button
              type="submit"
              className="admindashboard-add-engineer-btn admindashboard-add-engineer-submit-btn"
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
