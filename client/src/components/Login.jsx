// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "../styles/Login.css";

// const Login = () => {
//   const [rollno, setRollno] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       if (rollno === "Admin") {
//         localStorage.setItem("user_PK", "Admin");
//         navigate("/AdminDashboard");
//         return;
//       }

//       // Engineer login
//       if (/^\d+$/.test(rollno)) {
//         const res = await axios.post(
//           "http://localhost:4000/api/engineer/login",
//           {
//             user_PK: rollno,
//             password,
//           }
//         );
//         if (res.status === 200) {
//           const { user_PK } = res.data.user;
//           localStorage.setItem("user_PK", user_PK);
//           navigate("/EngineerDashboard");
//           return;
//         }
//       }

//       // Student login (rollno includes 'IIT')
//       if (rollno.includes("IIT")) {
//         const res = await axios.post(
//           "http://localhost:4000/api/student/login",
//           {
//             rollno,
//             password,
//           }
//         );
//         if (res.status === 200) {
//           const { user_PK ,room_FK} = res.data.user;
//           console.log('ROLL NO: ', rollno);
//           localStorage.setItem("roll_number", rollno);
//           localStorage.setItem("user_PK", user_PK);
//           localStorage.setItem("room_FK", room_FK);
//           navigate("/StudentDashboard");
//           return;
//         }
//       }

//       setError("Invalid roll number or password");
//     } catch (err) {
//       setError("Invalid roll number or password");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="login-header">
//           <div className="login-logo">
//             <svg viewBox="0 0 24 24" className="logo-icon" aria-hidden="true">
//               <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//             </svg>
//           </div>
//           <h1 className="login-title">LoginPortal</h1>
//           <p className="login-subtitle">Sign in to your account</p>
//         </div>

//         {error && (
//           <div className="error-alert">
//             <svg viewBox="0 0 24 24" className="error-icon" aria-hidden="true">
//               <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//             </svg>
//             <span>{error}</span>
//           </div>
//         )}

//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="rollno" className="form-label">
//               Roll Number
//             </label>
//             <div className="input-container">
//               <svg
//                 viewBox="0 0 24 24"
//                 className="input-icon"
//                 aria-hidden="true"
//               >
//                 <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//               </svg>
//               <input
//                 id="rollno"
//                 type="text"
//                 className="form-input"
//                 placeholder="      Enter your roll number"
//                 value={rollno}
//                 onChange={(e) => setRollno(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <div className="input-container">
//               <svg
//                 viewBox="0 0 24 24"
//                 className="input-icon"
//                 aria-hidden="true"
//               >
//                 <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//               </svg>
//               <input
//                 id="password"
//                 type="password"
//                 className="form-input"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-footer">
//             <button
//               type="submit"
//               className={`login-button ${loading ? "loading" : ""}`}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span className="spinner"></span>
//                   <span>Signing in...</span>
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//             <a href="#" className="forgot-password">
//               Forgot password?
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [rollno, setRollno] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const showSuccessAlert = (message) => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };
  const allowedPrefixes = [
    "IIT",
    "IIB",
    "IEC",
    "IMB",
    "IFI",
    "RSM",
    "MML",
    "MDE",
    "MRM",
    "MSE",
    "MWC",
    "MHC",
    "PMM",
    "PMD",
    "PMS",
  ];
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

      const normalizedRollno = rollno.toUpperCase();

      // Check if roll number starts with any of the allowed prefixes
      if (
        allowedPrefixes.some((prefix) => normalizedRollno.startsWith(prefix))
      ) {
        const res = await axios.post(
          "http://localhost:4000/api/student/login",
          {
            rollno,
            password,
          }
        );
        if (res.status === 200) {
          const { user_PK, room_FK } = res.data.user;
          console.log("ROLL NO: ", rollno);
          localStorage.setItem("roll_number", rollno);
          localStorage.setItem("user_PK", user_PK);
          localStorage.setItem("room_FK", room_FK);
          navigate("/StudentDashboard");
          return;
        }
      } else {
        alert("Invalid roll number format!");
      }

      setError("Invalid roll number or password");
    } catch (err) {
      setError("Invalid roll number or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_enhanced-login-container">
      {/* Success Alert */}
      {showSuccess && (
        <div className="login_success-alert">
          <svg
            viewBox="0 0 24 24"
            className="login_success-icon"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="login_success-text">
            Login successful! Redirecting...
          </span>
        </div>
      )}

      {/* Header Section */}
      <div className="login_welcome-header">
        <h1 className="login_welcome-title">
          Welcome to IIT Maintenance System
        </h1>
        <p className="login_welcome-subtitle">
          Your one-stop solution for hostel maintenance and facility management
        </p>
        <div className="login_welcome-divider"></div>
      </div>

      {/* Main Content */}
      <div className="login_main-content">
        <div className="login_enhanced-login-card">
          {/* Login Header */}
          <div className="login_login-header">
            <div className="login_login-logo-enhanced">
              <svg
                viewBox="0 0 24 24"
                className="login_logo-icon-enhanced"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="login_login-title-enhanced">Secure Login</h2>
            <p className="login_login-subtitle-enhanced">
              Enter your credentials to access the maintenance portal
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="login_error-alert-enhanced">
              <svg
                viewBox="0 0 24 24"
                className="login_error-icon-enhanced"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="login_enhanced-login-form" onSubmit={handleSubmit}>
            <div className="login_form-group-enhanced">
              <label htmlFor="rollno" className="login_form-label-enhanced">
                Roll Number / Employee ID
              </label>
              <div className="login_input-container-enhanced">
                <input
                  id="rollno"
                  type="text"
                  className="login_form-input-enhanced"
                  placeholder="Enter your roll number or employee ID"
                  value={rollno}
                  onChange={(e) => setRollno(e.target.value)}
                  required
                />
                <svg
                  viewBox="0 0 24 24"
                  className="login_input-icon-enhanced"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </div>

            <div className="login_form-group-enhanced">
              <label htmlFor="password" className="login_form-label-enhanced">
                Password
              </label>
              <div className="login_input-container-enhanced">
                <input
                  id="password"
                  type="password"
                  className="login_form-input-enhanced"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <svg
                  viewBox="0 0 24 24"
                  className="login_input-icon-enhanced"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <circle cx="12" cy="16" r="1" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </div>
            </div>

            <div className="login_form-footer-enhanced">
              <button
                type="submit"
                className={`login_login-button-enhanced ${
                  loading ? "login_loading" : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login_spinner-enhanced"></span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="login_button-arrow"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              <a href="#" className="login_forgot-password-enhanced">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="login_college-footer">
        <div className="login_footer-content">
          <h3 className="login_footer-title">IIT Maintenance Portal</h3>
          <p className="login_footer-subtitle">
            Empowering efficient facility management • Contact IT Support:
            support@iit.ac.in
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
