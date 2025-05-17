import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import StudentDashboard from './components/StudentDashboard'
import Test from './components/Test'
import AdminDashboard from './components/AdminDashboard'

import EngineerDashboard from './components/EngineerDashboard'




function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/Test" element={<Test />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/EngineerDashboard" element={<EngineerDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
