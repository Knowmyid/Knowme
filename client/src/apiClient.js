const API_URL = 'http://localhost:4000';

export const uploadAadhaar = async (file) => {
    const formData = new FormData();
    formData.append('aadhaar', file);

    const response = await fetch(`${API_URL}/api/upload/aadhar`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

export const fetchAdditionalData = async (file) => {
    const formData = new FormData();
    formData.append('aadhaar', file);

    const response = await fetch(`${API_URL}/api/upload/aadhar/additional-data`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};
