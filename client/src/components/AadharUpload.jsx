import React, { useState } from 'react';
import * as apiClient from '../apiClient.js';
import up from '../assets/up.png';
import { useNavigate } from 'react-router-dom';

const AadhaarUpload = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await apiClient.uploadAadhaar(file);
            console.log('Data uploaded successfully:', data);
            navigate('/data'); 
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div className='min-h-screen w-full h-[100vh] mx-auto p-4 flex flex-col items-center justify-center bg-gradient-to-r from-[#555555] to-black'>
            <img src={up} alt='up' className='w-[500px] mb-6'/>  
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
                <h2 className='text-2xl font-semibold mb-4 text-center'>Upload Aadhaar Document</h2>
                <form onSubmit={handleSubmit} className='flex flex-col items-center'>
                    <input 
                        type="file" 
                        onChange={handleFileChange} 
                        className='mb-4 p-2 border border-gray-300 rounded'
                    />
                    <button 
                        type="submit" 
                        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition'
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AadhaarUpload;
