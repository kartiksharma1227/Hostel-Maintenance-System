// File: Dbms1/src/components/Test.jsx

import React, { useState } from 'react';

export default function Test() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'Low',
    location: '',
    description: '',
    agreed: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomNumber = parseInt(formData.location, 10);

    if (isNaN(roomNumber)) {
      alert('Please enter a valid room number.');
      return;
    }

    const payload = {
      room_FK: roomNumber,
      title: formData.title,
      category: formData.category,
      priority: formData.priority,
      location: formData.location, // Stored as string
      description: formData.description,
      submitted_by: 1, // Replace with actual user ID
    };

    try {
      const response = await fetch('http://localhost:4000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Complaint submitted successfully:', result);
        // Reset form
        setFormData({
          title: '',
          category: '',
          priority: 'Low',
          location: '',
          description: '',
          agreed: false,
        });
      } else {
        console.error('Failed to submit complaint:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Complaint</h2>

      <label>
        Title (required):
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Category (required):
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">--Select--</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Furniture">Furniture</option>
          <option value="HVAC">HVAC</option>
          <option value="Electronics">Electronics</option>
          <option value="Others">Others</option>
        </select>
      </label>
      <br />

      <fieldset>
        <legend>Priority</legend>
        <label>
          <input
            type="radio"
            name="priority"
            value="Low"
            checked={formData.priority === 'Low'}
            onChange={handleChange}
          />
          Low
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="Medium"
            checked={formData.priority === 'Medium'}
            onChange={handleChange}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            name="priority"
            value="High"
            checked={formData.priority === 'High'}
            onChange={handleChange}
          />
          High
        </label>
      </fieldset>
      <br />

      <label>
        Room Number (required):
        <input
          type="number"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          min="1"
          step="1"
        />
      </label>
      <br />

      <label>
        Description (required):
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </label>
      <br />

      <label>
        <input
          type="checkbox"
          name="agreed"
          checked={formData.agreed}
          onChange={handleChange}
          required
        />
        I confirm the information is accurate
      </label>
      <br />

      <button type="submit">Submit Complaint</button>
    </form>
  );
}
