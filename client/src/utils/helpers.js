// Format date to a readable string
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// API URL helper - constructs full API URL
export const getApiUrl = (endpoint) => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
  // Remove leading slash from endpoint if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Format time elapsed since a given date
export const getTimeElapsed = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
  if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  if (minutes > 0)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  return "Just now";
};

// Get category icon based on category name
export const getCategoryIcon = (category) => {
  const icons = {
    furniture: "🪑",
    hvac: "❄️",
    electrical: "⚡",
    plumbing: "🚰",
    internet: "🌐",
    cleaning: "🧹",
    electronics: "💻",
    security: "🔒",
    other: "🔧",
  };
  return icons[category.toLowerCase()] || "🔧";
};

// Get status color class
export const getStatusColorClass = (status) => {
  const statusColors = {
    pending: "pending",
    "in progress": "in-progress",
    completed: "completed",
    cancelled: "cancelled",
  };
  return statusColors[status.toLowerCase()] || "default";
};

// Validate complaint form data
export const validateComplaintForm = (formData) => {
  const errors = {};

  if (!formData.title?.trim()) {
    errors.title = "Title is required";
  } else if (formData.title.length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }

  if (!formData.category) {
    errors.category = "Please select a category";
  }

  if (!formData.description?.trim()) {
    errors.description = "Description is required";
  } else if (formData.description.length < 20) {
    errors.description = "Description must be at least 20 characters long";
  }

  if (!formData.location?.trim()) {
    errors.location = "Location is required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

// Filter and sort complaints
export const filterAndSortComplaints = (complaints, filters) => {
  return complaints
    .filter((complaint) => {
      const matchesStatus =
        !filters.status ||
        filters.status === "all" ||
        complaint.status.toLowerCase() === filters.status.toLowerCase();

      const matchesCategory =
        !filters.category ||
        filters.category === "all" ||
        complaint.category.toLowerCase() === filters.category.toLowerCase();

      const matchesSearch =
        !filters.search ||
        complaint.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        complaint.description
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      return matchesStatus && matchesCategory && matchesSearch;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Get priority label and color
export const getPriorityInfo = (priority) => {
  const priorityMap = {
    high: { label: "High Priority", color: "high-priority", icon: "🔴" },
    medium: { label: "Medium Priority", color: "medium-priority", icon: "🟡" },
    low: { label: "Low Priority", color: "low-priority", icon: "🟢" },
  };
  return priorityMap[priority.toLowerCase()] || priorityMap.medium;
};

// Generate avatar URL from name
export const getAvatarUrl = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=random&size=128`;
};
