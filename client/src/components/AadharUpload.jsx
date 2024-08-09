import React, { useState, useEffect } from 'react';
import * as apiClient from '../apiClient.js';
import up from '../assets/up.png';
import { useNavigate } from 'react-router-dom';
import { extractQrData } from '../utils/extractQrData';
import { generateArgs, init, prove, artifactUrls } from '@anon-aadhaar/core';

const anonAadhaarInitArgs = {
    wasmURL: artifactUrls.V1.wasm,
    zkeyURL: artifactUrls.V1.zkey,
    vkeyURL: artifactUrls.V1.vk,
    isWebEnv: true,
};

await init(anonAadhaarInitArgs);

const AadhaarUpload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const [qrData, setQrData] = useState('');
    const [args, setArgs] = useState(false);
    const [error, setError] = useState('');
    const [certificateContent, setCertificateContent] = useState('');


    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const response = await fetch('/uidai_auth_prod.cer');
                if (!response.ok) {
                    throw new Error('Failed to fetch the certificate file.');
                }
                const text = await response.text();
                setCertificateContent(text);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCertificate();
    }, []);

const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
 
    if (selectedFile) {
        try {
            const qrData = await extractQrData(selectedFile);
            setQrData(qrData);
            console.log('Extracted QR Data:', qrData);

            const args = await generateArgs({
                qrData,
                certificateFile: certificateContent,
                nullifierSeed: 1234,
            });

            if (args) {
                console.log("Args Generated");
                setArgs(true);
            }

        } catch (error) {
            setError(error.message);
        }
    }
};



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (args) {
                const data = await apiClient.uploadAadhaar(file);
                console.log('Data uploaded successfully:', data);
                navigate('/data', { state: { aadharData: data.data } });
            }

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className='min-h-screen w-full h-[100vh] mx-auto p-4 flex flex-col md:flex-row items-center justify-center bg-discount-gradient'>
            <img src={up} alt='up' className='w-[500px] mb-6' />
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md mb-20'>
                <h2 className='text-2xl font-semibold mb-4 text-center'>Upload Aadhaar Document</h2>
                <form onSubmit={handleSubmit} className='flex flex-col items-center '>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className='mb-4 p-2 border border-gray-300 rounded'
                    />
                    <button
                        disabled={!args}
                        type="submit"
                        className={`${!args ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
                            } text-white p-2 rounded transition`}
                    >
                        Upload
                    </button>

                </form>
            </div>
        </div>
    );
};

export default AadhaarUpload;