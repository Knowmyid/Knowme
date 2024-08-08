import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayData = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const data = JSON.parse(decodeURIComponent(queryParams.get('data')));

    return (
        <div className="min-h-screen w-full mx-auto p-4 flex flex-col items-center justify-center bg-discount-gradient">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center">Aadhaar Details</h2>
                <ul>
                    {Object.entries(data).map(([key, value]) => (
                        <li key={key} className="mb-2">
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DisplayData;
