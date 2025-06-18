import React, { useEffect } from "react";
import "../../styles/SuccessToast.css";

const SuccessToast = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="admin-dashboard-success-toast">
      <div className="admin-dashboard-success-toast-content">
        <span className="admin-dashboard-success-toast-icon">✓</span>
        {message}
      </div>
    </div>
  );
};

export default SuccessToast;
