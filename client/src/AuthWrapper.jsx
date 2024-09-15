import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const AuthWrapper = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>; // Show loading while Auth0 processes the authentication
    }

    return isAuthenticated ? children : <Navigate to="/upload" />;
};

export default AuthWrapper;
