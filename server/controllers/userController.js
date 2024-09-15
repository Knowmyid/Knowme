import ScannedData from "../models/scannedData.js";
import User from "../models/users.js";


export const fetchUserData = async (req, res) => {
    try {
        const { email } = req.query;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.json(null);
        }
        res.json(user)
    }catch (err) {
        res.status(500).json({ error: 'Error fetching User' });
    }
}

export const fetchUserShares = async (req, res) => {
    try {
        const { email } = req.query;
        console.log(`Fetching scanned data for email: ${email}`); // Log the email for debugging

        const scannedData = await ScannedData.find({ email: email });
        console.log(`Scanned data found: ${scannedData.length} records`); // Log the number of records found

        if (scannedData.length === 0) {
            return res.json([]);
        }

        res.json(scannedData);
    } catch (err) {
        console.error('Error fetching scanned data:', err); // Log the error for debugging
        res.status(500).json({ error: 'Error fetching scanned data' });
    }
};
