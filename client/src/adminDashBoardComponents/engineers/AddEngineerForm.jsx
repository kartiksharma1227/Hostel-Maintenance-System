import React, { useState } from "react";

const AddEngineerForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    mail_UN: "",
    role: "engineer",
    phone_number: "",
    availability: "1",             // keep as string for the <select>
    specialization: "",
    years_of_experience: "",       // keep as string for the <input>
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert numeric fields before sending
    const payload = {
      ...formData,
      availability: Number(formData.availability),
      years_of_experience: Number(formData.years_of_experience),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="add-engineer-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="mail_UN">Email</label>
        <input
          id="mail_UN"
          name="mail_UN"
          type="email"
          value={formData.mail_UN}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select id="role" name="role" value={formData.role} onChange={handleInputChange}>
          <option value="engineer">Engineer</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="phone_number">Phone Number</label>
        <input
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="availability">Availability</label>
        <select
          id="availability"
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
        >
          <option value="1">Available</option>
          <option value="0">Not Available</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="specialization">Specialization</label>
        <input
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="years_of_experience">Years of Experience</label>
        <input
          id="years_of_experience"
          name="years_of_experience"
          type="number"
          min="0"
          value={formData.years_of_experience}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Add Engineer
      </button>
    </form>
  );
};

export default AddEngineerForm;
