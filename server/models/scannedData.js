import mongoose from "mongoose";


const scannedDataSchema = new mongoose.Schema({
    qrId: { type: String, required: true }, // Unique ID for the QR code
    email: { type: String, required: true }, // Add user email to the schema
    sharedData: { type: Object, required: true }, // Aadhaar details being shared
    scannedAt: { type: Date, default: Date.now }, // Date when the QR was generated or scanned
});

const ScannedData = mongoose.model('ScannedData', scannedDataSchema);

export default ScannedData;

