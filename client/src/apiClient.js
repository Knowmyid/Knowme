export const API_URL = process.env.VITE_API_URL

export const uploadAadhaar = async (formData) => {

    const response = await fetch(`${API_URL}/api/upload/aadhar`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    console.log(JSON.stringify(response));
    return response.json();
};


export const fetchQrData = async (qrId) => {
    try {
        console.log(qrId);

        const response = await fetch(`${API_URL}/api/qrData/${qrId}`);


        if (!response.ok) {
            throw new Error('Failed to fetch QR data');
        }


        const data = await response.json();
        console.log("Data:", data);

        // Log the actual data

        return data;
    } catch (error) {
        console.error('Error fetching QR data:', error);
        throw error;
    }
};


export const fetchUserData = async (email) => {
    try {
        const response = await fetch(`${API_URL}/api/userData?email=${encodeURIComponent(email)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const fetchUserShares = async (email) => {
    try {
        const response = await fetch(`${API_URL}/api/userShares?email=${encodeURIComponent(email)}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user shares');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user shares:', error);
        throw error;
    }
};