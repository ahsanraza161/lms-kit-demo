import React from 'react'
import './mainadmin.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/pages/dashboard'
import Students from './components/pages/students'
import Teachers from './components/pages/teachers'
import PendingRegistrations from './components/pages/pending-registration'
import addUser from './components/pages/adduser'

function HomeAdmin() {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/usermanagment" element={<PendingRegistrations />} />
        <Route path="/adduser" element={<addUser />} />
      </Routes>
    </div>
  )
}

export default HomeAdmin
