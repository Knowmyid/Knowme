import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQrData } from '../apiClient';
import { decryptText } from '../utils/encryption';

const DisplayData = () => {
    const { qrId } = useParams(); // Get the qrId from the URL
    const [qrData, setQrData] = useState(null);
    const Ekey = import.meta.env.VITE_ENCRYPTION_KEY;

    useEffect(() => {
        // Fetch the scanned data from the backend using the qrId
        const fetchData = async () => {
            try {
                const response = await fetchQrData(qrId);
                
                // Log response to see the actual data
                console.log("Fetched Data: ", response);
                
                // Set the fetched data
                setQrData(response); // No need to use response.data if the response is the data itself
            } catch (error) {
                console.error('Error fetching QR data:', error);
            }
        };

        fetchData();
    }, [qrId]);

    if (!qrData) {
        return <div className="text-center text-white">Loading...</div>;
    }

    // Decrypt the sharedData
    const decryptedData = Object.keys(qrData.sharedData).reduce((acc, key) => {
        acc[key] = decryptText(qrData.sharedData[key], Ekey);
        return acc;
    }, {});

    return (
        <div className="bg-gray-800 text-white p-6 rounded-lg max-w-4xl mx-auto shadow-lg">
            <h2 className="text-2xl font-bold mb-4">QR Code Data</h2>
            <p className="text-lg mb-2"><strong>Scanned At:</strong> {new Date(qrData.scannedAt).toLocaleString()}</p>
            <div>
                {Object.keys(decryptedData).map((key) => (
                    <p key={key} className="text-lg mb-1"><strong className="text-teal-400">{key}:</strong> {decryptedData[key]}</p>
                ))}
            </div>
        </div>
    );
};

export default DisplayData;
