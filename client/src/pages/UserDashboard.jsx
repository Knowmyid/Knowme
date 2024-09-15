import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchUserShares } from "../apiClient";
import { decryptText } from '../../../server/utils/encryption'


const key = 'Nq1SuH89Y0F1XNWWtYqGB8838fCI1JnSMw'; // Replace with your actual key

const UserDashboard = () => {
    const [shares, setShares] = useState([]);
    const [error, setError] = useState(null);
    const { user } = useAuth0();
    const email = user?.email;

    useEffect(() => {
        const loadUserShares = async () => {
            try {
                const data = await fetchUserShares(email);


                // Decrypt each sharedData field except for the email
                const decryptedShares = data.map((share) => {
                    const decryptedData = { ...share.sharedData };


                    // Loop through each field in sharedData and decrypt it except for email
                    Object.keys(decryptedData).forEach((key) => {
                        if (key !== "email") {
                            decryptedData[key] = decryptText(decryptedData[key], 'Nq1SuH89Y0F1XNWWtYqGB8838fCI1JnSMw'); // Replace with your actual key
                        }
                    });

                    return {
                        ...share,
                        sharedData: decryptedData
                    };
                });

                setShares(decryptedShares);
            } catch (err) {
                setError(err);
            }
        };

        if (email) {
            loadUserShares();
        }
    }, [email]);

    console.log(shares);

    if (error) {
        return (
            <div className="text-red-500">
                Error: {error.message}
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-800 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-white">User Shares</h2>
            {shares.length > 0 ? (
                <ul className="space-y-4">
                    {shares.map((share) => (
                        <li key={share.qrId} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                            <div className="text-lg font-semibold text-white">QR ID: {share.qrId}</div>
                            <p className="text-lg font-semibold text-white"><strong>Scanned At:</strong> {new Date(share.scannedAt).toLocaleString()}</p>
                            <div className="mt-2 text-gray-300">
                                <strong>Shared Data:</strong>
                                <div className="mt-1">
                                    <pre className="whitespace-pre-wrap bg-gray-600 p-2 rounded overflow-hidden">{JSON.stringify(share.sharedData, null, 2)}</pre>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="text-white">No shares available.</div>
            )}
        </div>
    );
};

export default UserDashboard;
