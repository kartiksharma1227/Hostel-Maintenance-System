import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "../../styles/SuccessToast.css";

let toastTimeout;

const SuccessToast = {
  show: (title, message) => {
    const event = new CustomEvent("showSuccessToast", {
      detail: { title, message },
    });
    window.dispatchEvent(event);
  },
};

export const SuccessToastComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState({ title: "", message: "" });

  useEffect(() => {
    const handleShowToast = (event) => {
      const { title, message } = event.detail;
      setToast({ title, message });
      setIsVisible(true);

      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    window.addEventListener("showSuccessToast", handleShowToast);
    return () =>
      window.removeEventListener("showSuccessToast", handleShowToast);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="student-success-toast">
      <div className="student-success-toast-content">
        <div className="student-success-icon">
          <FaCheckCircle />
        </div>
        <div className="student-toast-message">
          <h4>{toast.title}</h4>
          <p>{toast.message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessToast;
