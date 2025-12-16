// This file contains constants used throughout the application.

import {
  FaBolt,
  FaWater,
  FaTools,
  FaSnowflake,
  FaBroom,
  FaNetworkWired,
} from "react-icons/fa";

// API Configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";

export const COMPLAINT_CATEGORIES = [
  { id: "Electrical", label: "Electrical", icon: FaBolt },
  { id: "Plumbing", label: "Plumbing", icon: FaWater },
  { id: "Carpentry", label: "Carpentry", icon: FaTools },
  { id: "HVAC", label: "HVAC", icon: FaSnowflake },
  { id: "Cleaning", label: "Cleaning", icon: FaBroom },
  { id: "Internet", label: "Internet", icon: FaNetworkWired },
  { id: "Others", label: "Others", icon: FaTools },
];

export const COMPLAINT_STATUS = {
  PENDING: "pending",
  IN_PROGRESS: "in-progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const PRIORITY_LEVELS = [
  { id: "low", label: "Low Priority", color: "#4caf50" },
  { id: "medium", label: "Medium Priority", color: "#ff9800" },
  { id: "high", label: "High Priority", color: "#f44336" },
];

export const FEEDBACK_LABELS = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export const FILE_UPLOAD_CONFIG = {
  maxFiles: 5,
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export const TOAST_DURATION = 3000; // 3 seconds

export const API_ENDPOINTS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  COMPLAINTS: "/api/complaints",
  PROFILE: "/api/profile",
  NOTIFICATIONS: "/api/notifications",
};
