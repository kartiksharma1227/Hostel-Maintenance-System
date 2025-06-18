// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// import Login from './components/Login'
// import StudentDashboard from './components/StudentDashboard'
// import Test from './components/Test'
// import AdminDashboard from './components/AdminDashboard'

// import EngineerDashboard from './components/EngineerDashboard'




// function App() {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/StudentDashboard" element={<StudentDashboard />} />
//         <Route path="/Test" element={<Test />} />
//         <Route path="/AdminDashboard" element={<AdminDashboard />} />
//         <Route path="/EngineerDashboard" element={<EngineerDashboard />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import StudentDashboard from './components/StudentDashboard';
import Test from './components/Test';
import AdminDashboard from './components/AdminDashboard';
import EngineerDashboard from './components/EngineerDashboard';
import ProtectedRoute from './components/ProtectedRoute';  // ⬅️ import the guard

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route
          path="/StudentDashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
       <Route
          path="/AdminDashboard"
          element={
            // <ProtectedRoute>
            //   <AdminDashboard />
            // </ProtectedRoute>
            <AdminDashboard />
          }
        />
        <Route
          path="/EngineerDashboard"
          element={
            // <ProtectedRoute>
            //   <EngineerDashboard />
            // </ProtectedRoute>
              <EngineerDashboard />
          }
        />
        <Route
          path="/Test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
