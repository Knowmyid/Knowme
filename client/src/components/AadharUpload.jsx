import React, { useState, useEffect } from 'react';
import * as apiClient from '../apiClient.js';
import { generateArgs, init, prove, artifactUrls } from '@anon-aadhaar/core';
import up from '../assets/up.png';
import { useNavigate } from 'react-router-dom';
import { extractQrData } from '../utils/extractQrData';
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook

const AadhaarUpload = () => {
    const [file, setFile] = useState(null);
    const [qrData, setQrData] = useState('');
    const [args, setArgs] = useState(false);
    const [error, setError] = useState('');
    const [certificateContent, setCertificateContent] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, loginWithRedirect, user } = useAuth0(); // Auth0

    useEffect(() => {
        const initAnonAadhaar = async () => {
            try {
                await init({
                    wasmURL: artifactUrls.V1.wasm,
                    zkeyURL: artifactUrls.V1.zkey,
                    vkeyURL: artifactUrls.V1.vk,
                    isWebEnv: true,
                });
            } catch (error) {
                setError(`Initialization error: ${error.message}`);
            }
        };

        const fetchCertificate = async () => {
            try {
                const response = await fetch('/uidai_auth_prod.cer');
                if (!response.ok) {
                    throw new Error('Failed to fetch the certificate file.');
                }
                const text = await response.text();
                setCertificateContent(text);
            } catch (error) {
                setError(`Certificate fetch error: ${error.message}`);
            }
        };

        initAnonAadhaar();
        fetchCertificate();
    }, []);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            try {
                const extractedQrData = await extractQrData(selectedFile);
                setQrData(extractedQrData);
                console.log('Extracted QR Data:', extractedQrData);

                const generatedArgs = await generateArgs({
                    qrData: extractedQrData,
                    certificateFile: certificateContent,
                    nullifierSeed: 1234,
                });

                if (generatedArgs) {
                    console.log("Args Generated");
                    setArgs(true);
                }

            } catch (error) {
                setError(`QR Data extraction error: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!args) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('aadhaar', file);
            formData.append('email', user.email);
            formData.append('name', user.name);

            const data = await apiClient.uploadAadhaar(formData);
            console.log('Data uploaded successfully:', data);
            navigate('/user-dashboard', { state: { aadharData: data.data } });
        } catch (error) {
            setError(`File upload error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-discount-gradient">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-semibold mb-4 text-center" >Please Log In</h2>
                    <button
                        onClick={() => loginWithRedirect()}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Log In with Auth0
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center p-4 bg-discount-gradient'>
            <img src={up} alt='up' className='w-full max-w-xs md:max-w-md mb-6' />
            <div className='bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-xl md:text-2xl font-semibold mb-4 text-center'>Upload Aadhaar Document</h2>
                {error && <p className='text-red-500 mb-4'>{error}</p>}
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className='mb-4 p-2 border border-gray-300 rounded w-full'
                    />
                    <button
                        disabled={!args || loading}
                        type="submit"
                        className={`${!args || loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                            } text-white p-2 rounded w-full transition`}
                    >
                        {loading ? 'Uploading...' : 'Upload'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AadhaarUpload;
