import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchQrData } from '../apiClient';

const DisplayData = () => {
    const { qrId } = useParams(); // Get the qrId from the URL
    const [qrData, setQrData] = useState(null);

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
        return <div>Loading...</div>;
    }

    return (
        <div className='text-white'>
            <h2>QR Code Data</h2>
            <p><strong>Scanned At:</strong> {new Date(qrData.scannedAt).toLocaleString()}</p>
            <div>
                {Object.keys(qrData.sharedData).map((key) => (
                    <p key={key}><strong>{key}:</strong> {qrData.sharedData[key]}</p>
                ))}
            </div>
        </div>
    );
};

export default DisplayData;
