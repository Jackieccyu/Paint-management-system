import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { PaintProvider } from './context/PaintContext';
import KanbanBoard from './components/KanbanBoard';
import UpdateInventoryForm from './components/UpdateInventoryForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import PermissionsControl from './components/PermissionsControl';
import { UserPermissionsProvider } from './context/UserPermissionsContext';
import './App.css';
import UserDashboard from './components/UserDashboard';

function App() {
  const [userRole, setUserRole] = useState('guest');

  const handleRoleChange = (role) => {
    setUserRole(role);
  };

  return (
    <Router>
      <UserPermissionsProvider>
      <PaintProvider>
        <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate replace to="/user/john" />} />
          <Route path="/user/:username" element={<UserDashboard />} />
        </Routes>  
        </div>
      </PaintProvider>
      </UserPermissionsProvider>
    </Router>
  );
}

export default App;