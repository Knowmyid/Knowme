import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import PrivateRoute from '../PrivateRoute';
import AuthWrapper from '../AuthWrapper';

const Body = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="/data" element={<DataRetrieve />} />
                    <Route path="/upload" element={<AadhaarUpload />} />
                    <Route path="/" element={<MainContent />} />
                    <Route path="/display-data/:qrId" element={<DisplayData />} />
                    <Route
                        path="/user-dashboard"
                        element={
                            <AuthWrapper>
                                <UserDashboard />
                            </AuthWrapper>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home page for any unmatched routes */}
                </Route>
            </Routes>
        </div>
    );
};

export default Body;
