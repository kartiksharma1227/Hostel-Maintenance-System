import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (rollno === "Admin") {
        localStorage.setItem("user_PK", "Admin");
        navigate("/AdminDashboard");
        return;
      }

      // Engineer login
      if (/^\d+$/.test(rollno)) {
        const res = await axios.post(
          "http://localhost:4000/api/engineer/login",
          {
            user_PK: rollno,
            password,
          }
        );
        if (res.status === 200) {
          const { user_PK } = res.data.user;
          localStorage.setItem("user_PK", user_PK);
          navigate("/EngineerDashboard");
          return;
        }
      }

      // Student login (rollno includes 'IIT')
      if (rollno.includes("IIT")) {
        const res = await axios.post(
          "http://localhost:4000/api/student/login",
          {
            rollno,
            password,
          }
        );
        if (res.status === 200) {
          const { user_PK ,room_FK} = res.data.user;
          console.log('ROLL NO: ', rollno);
          localStorage.setItem("roll_number", rollno);
          localStorage.setItem("user_PK", user_PK);
          localStorage.setItem("room_FK", room_FK);
          navigate("/StudentDashboard");
          return;
        }
      }

      setError("Invalid roll number or password");
    } catch (err) {
      setError("Invalid roll number or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <svg viewBox="0 0 24 24" className="logo-icon" aria-hidden="true">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="login-title">LoginPortal</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {error && (
          <div className="error-alert">
            <svg viewBox="0 0 24 24" className="error-icon" aria-hidden="true">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rollno" className="form-label">
              Roll Number
            </label>
            <div className="input-container">
              <svg
                viewBox="0 0 24 24"
                className="input-icon"
                aria-hidden="true"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                id="rollno"
                type="text"
                className="form-input"
                placeholder="      Enter your roll number"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-container">
              <svg
                viewBox="0 0 24 24"
                className="input-icon"
                aria-hidden="true"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                id="password"
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-footer">
            <button
              type="submit"
              className={`login-button ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  <span>Signing in...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
