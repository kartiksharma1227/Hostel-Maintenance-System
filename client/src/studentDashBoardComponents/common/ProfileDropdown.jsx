import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const ProfileDropdown = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userPk = localStorage.getItem("user_PK");
    if (!userPk) {
      setError("Not authenticated");
      return;
    }

    axios
      .get(`/api/student/profile/${userPk}`)
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
    // 1) Remove any auth tokens / data
    localStorage.removeItem("user_PK");
    // (if you use cookies or other storage, clear them here too)

    // 2) Close the dropdown
    onClose?.();

    // 3) Redirect to login
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
