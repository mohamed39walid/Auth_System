import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    // If there is no token, redirect to the login page
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Optionally, you could verify the token with your backend here

    return children;
};

export default ProtectedRoute;
