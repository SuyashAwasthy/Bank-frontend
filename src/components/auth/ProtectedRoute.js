import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyAdmin } from '../services/authService';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const result = await verifyAdmin(); // Ensure this uses the token from local storage
        setIsAdmin(result);
      } catch (error) {
        console.error('Error verifying admin status:', error);
        setIsAdmin(false); // Treat errors as unauthorized
      }
    };

    checkAdminStatus();
  }, []);

  if (isAdmin === null) {
    return <div>Loading...</div>; // Show loading state while verifying
  }

  return isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;