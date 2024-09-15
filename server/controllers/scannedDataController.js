import ScannedData from '../models/scannedData.js';

export const trackScan = async (req, res) => {
    try {
        const qrId = req.params.qrId;
        const sharedData = JSON.parse(req.query.data);

        const { email } = sharedData;


        const newScan = new ScannedData({
            qrId,
            sharedData,
            email
        });

        await newScan.save();

        const finalUrl = `https://knowme-zc44.onrender.com/display-data/${qrId}`;
        res.redirect(finalUrl);
    } catch (error) {
        res.status(500).json({ error: 'Error logging QR scan.' });
    }
};

export const fetchData = async (req, res) => {
    try {
        const qrId = req.params.qrId;
        const qrScan = await ScannedData.findOne({ qrId });

        if (!qrScan) {
            return res.status(404).json({ error: 'QR scan data not found' });
        }

        // Send the scanned data and timestamp back to the frontend
        res.json(qrScan);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching QR scan data' });
    }
}