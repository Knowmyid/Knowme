import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainContent from './MainContent';
import DataRetrieve from './DataRetrieve';
import AadhaarUpload from './AadharUpload';
import HomePage from '../pages/homePage';
import DisplayData from '../pages/DisplayData';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import UserDashboard from '../pages/UserDashboard';

import { fetchUserData } from '../apiClient';

const Body = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect( () => {
        if (!isLoading) { // Wait for authentication to complete
            if (isAuthenticated && user?.email) {
                fetchUserData(user.email)
                    .then(userData => {
                        if (userData) {
                            navigate('/user-dashboard');
                        } else {
                            navigate('/upload');
                        }
                    })
                    .catch(err => {
                        console.error("Error:", err);
                        setError(err);
                        navigate('/upload');
                    });
            } else {
                navigate('/upload');
            }
        }
    }, [isAuthenticated]);

    if (isLoading) {
        return <div>Loading...</div>; // Show loading while Auth0 processes the authentication
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="/data" element={<DataRetrieve />} />
                    <Route path="/upload" element={<AadhaarUpload />} />
                    <Route path="/" element={<MainContent />} />
                    <Route path="/display-data/:qrId" element={<DisplayData />} />
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                </Route>
            </Routes>
        </div>
    );
};

export default Body;
