import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import MainDashboard from './components/adminDashboard/MainDashboard';
import CustomerManagement from './components/adminDashboard/CustomerManagement';
import AccountManagement from './components/adminDashboard/AccountManagement';
import TransactionManagement from './components/adminDashboard/TransactionManagement';
import UserDashboard from './components/userDashboard/UserDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes for admin access */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={MainDashboard} />}
        />
        <Route
          path="/admin/customers"
          element={<ProtectedRoute element={CustomerManagement} />}
        />
        <Route
          path="/admin/accounts"
          element={<ProtectedRoute element={AccountManagement} />}
        />
        <Route
          path="/admin/transactions"
          element={<ProtectedRoute element={TransactionManagement} />}
        />

        {/* Protected routes for user access */}
        <Route
          path="/user/dashboard"
          element={<ProtectedRoute element={UserDashboard} />}
        />

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;