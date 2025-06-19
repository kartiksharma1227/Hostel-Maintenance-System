// src/EngineerDashboardComponents/Header.jsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";


const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [engineerProfile, setEngineerProfile] = useState(null);
  const profileAvatarRef = useRef();

  // Fetch engineer on mount
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // console.log("Token:", token);
    // if (token) {
    //   const decoded = jwtDecode(token);
    //   console.log(decoded); // { user_PK, role, exp, iat, ... }

    // }
    // const userPk = decoded.user_PK;
    // console.log("Decoded User PK:", userPk);
    // console.log("User PK:", userPk);
    // if (!userPk) return;

    // axios
    //   .get(`/api/engineer/profile/${userPk}`)
    //   .then((res) => setEngineerProfile(res.data.profile))
    //   .catch((err) => console.error("Could not load engineer profile:", err));
    try {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  if (!token) {
    console.warn("No token found in localStorage.");
    return;
  }

  const decoded = jwtDecode(token);
  console.log("Decoded token:", decoded);

  const userPk = decoded?.user_PK;

  if (!userPk) {
    console.warn("User PK not found in token.");
    return;
  }

  axios
    .get(`/api/engineer/profile/${userPk}`)
    .then((res) => {
      console.log("Engineer profile loaded:", res.data.profile);
      setEngineerProfile(res.data.profile);
    })
    .catch((err) => {
      console.error("Could not load engineer profile:", err);
    });

} catch (err) {
  console.error("Error decoding token or fetching profile:", err);
}
  }, []);

  // If still loading profile
  if (!engineerProfile) {
    return (
      <header className="engineer-dashboard-header">
        <div className="engineer-logo">
          <h1>IIIT-A Maintenance</h1>
        </div>
        <div>Loading profile…</div>
      </header>
    );
  }

  return (
    <>
      <header className="engineer-dashboard-header">
        <div className="engineer-logo">
          <h1>IIIT-A Maintenance</h1>
        </div>
        <div
          className="engineer-user-profile"
          onClick={() => setShowProfile((v) => !v)}
        >
          <span>{engineerProfile.name}</span>
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              engineerProfile.name
            )}&background=2196f3&color=fff`}
            alt="Profile"
            className="engineer-avatar"
            ref={profileAvatarRef}
          />
        </div>
      </header>

      {showProfile && (
        <div className="engineer-profile-dropdown">
          <div className="engineer-profile-header">
            <div className="engineer-profile-avatar">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  engineerProfile.name
                )}&background=2196f3&color=fff&size=120`}
                alt={engineerProfile.name}
              />
            </div>
            <div className="engineer-profile-name-info">
              <h3>{engineerProfile.name}</h3>
              <span className="engineer-profile-id">
                {engineerProfile.employeeId}
              </span>
            </div>
          </div>

          <div className="engineer-profile-details">
            <h4 className="engineer-section-title">Engineer Details</h4>

            <div className="engineer-detail-item">
              <span className="engineer-detail-icon">📧</span>
              <div className="engineer-detail-content">
                <span className="engineer-detail-label">Email: </span>
                <span className="engineer-detail-value">
                  {engineerProfile.email}
                </span>
              </div>
            </div>

            <div className="engineer-detail-item">
              <span className="engineer-detail-icon">⚡</span>
              <div className="engineer-detail-content">
                <span className="engineer-detail-label">Specialization: </span>
                <span className="engineer-detail-value">
                  {engineerProfile.specialization}
                </span>
              </div>
            </div>

            <div className="engineer-detail-item">
              <span className="engineer-detail-icon">📱</span>
              <div className="engineer-detail-content">
                <span className="engineer-detail-label">Contact: </span>
                <span className="engineer-detail-value">
                  {engineerProfile.contactNumber}
                </span>
              </div>
            </div>

            <div className="engineer-detail-item">
              <span className="engineer-detail-icon">⏳</span>
              <div className="engineer-detail-content">
                <span className="engineer-detail-label">
                  Experience(year/(s)):{" "}
                </span>
                <span className="engineer-detail-value">
                  {engineerProfile.experience}
                </span>
              </div>
            </div>
          </div>

          <div className="engineer-profile-accommodation">
            <h4 className="engineer-section-title">Address</h4>
            <div className="engineer-detail-item">
              <span className="engineer-detail-icon">🏢</span>
              <div className="engineer-detail-content">
                {/* <span className="engineer-detail-label">Staff Quarters</span> */}
                <span className="engineer-detail-value">
                  {engineerProfile.address}
                </span>
              </div>
            </div>
          </div>

          <div className="engineer-profile-actions">
            {/* <button className="engineer-profile-action-btn">
              <span className="engineer-btn-icon">⚙️</span> Edit Profile
            </button> */}
            <button
              className="engineer-profile-action-btn engineer-logout"
              onClick={() => {
                localStorage.removeItem("user_PK");

                window.location.href = "/login";
              }}
            >
              <span className="engineer-btn-icon">🚪</span> Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
