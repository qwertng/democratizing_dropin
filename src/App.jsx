import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import EditRegistrationPage from './pages/EditRegistrationPage';
import SignupListPage from './pages/SignupListPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Navigate to="/register" replace />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/edit" element={<EditRegistrationPage />} />
          <Route path="/list" element={<SignupListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
