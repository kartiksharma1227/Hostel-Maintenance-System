import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { API_BASE_URL } from "../../utils/constants";

const ProfileDropdown = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated");
      return;
    }

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (err) {
      console.error("Invalid token:", err);
      setError("Invalid token");
      return;
    }

    const userPk = decodedToken.user_PK; // 👈 assuming your token payload has user_PK
    if (!userPk) {
      setError("User ID not found in token");
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/student/profile/${userPk}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProfile(res.data.profile))
      .catch((err) => {
        console.error(err);
        setError("Could not load profile");
      });
  }, []);

  if (error) {
    return (
      <div className="profile-dropdown p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (!profile) {
    return (
      <div className="profile-dropdown p-4">
        <p>Loading…</p>
      </div>
    );
  }

  const { name, mail_UN: email, role, roll_number, room_FK } = profile;

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose?.();
    navigate("/login", { replace: true });
  };

  return (
    <div className="profile-dropdown bg-white shadow-lg rounded p-4 w-64">
      <div className="flex items-center mb-4">
        <FaUser size={32} className="mr-2 text-gray-600" />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{roll_number}</p>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium">Account</h4>
        <div className="text-sm text-gray-700">
          <div>Email: {email}</div>
          <div>Role: {role}</div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="font-medium">Accommodation</h4>
        <div className="text-sm text-gray-700">
          <div>Room ID: {room_FK}</div>
        </div>
      </div>

      <div className="border-t pt-3">
        <button
          className="w-full flex items-center justify-center text-red-600 hover:bg-red-50 rounded py-2"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
