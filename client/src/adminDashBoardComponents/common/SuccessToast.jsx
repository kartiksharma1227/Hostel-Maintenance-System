import React from "react";

const SuccessToast = ({ message, visible }) => {
  if (!visible) return null;

  return <div className="success-toast">{message}</div>;
};

export default SuccessToast;
