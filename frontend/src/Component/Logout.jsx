import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

function Logout() {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');

        // Redirect to the login page or home page
        navigate('/login'); // Or use any route you prefer for post-logout
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default Logout;
