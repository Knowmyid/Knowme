import Jimp from 'jimp';
import Tesseract from 'tesseract.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';
import { processExtractedTextAadhar } from '../utils/textProcessing.js';
import { encryptText } from '../utils/encryption.js';
import User from '../models/users.js'; // Import User model


const processAadhaarImage = async (req, res) => {
    const { path: filePath } = req.file;
    const { email, name } = req.body; // Extract email and name from request body

    try {
        const image = await Jimp.read(filePath);
        image
            .resize(1024, Jimp.AUTO)
            .quality(80)
            .contrast(0.5)
            .greyscale()
            .blur(1)
            .normalize()
            .writeAsync(filePath);

        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
        const extractedData = processExtractedTextAadhar(text);

        console.log("Data extracted from Aadhaar:", JSON.stringify(extractedData));

        const encryptionKey = process.env.ENCRYPTION_KEY;

        // Encrypt the extracted data
        const encryptedData = {};
        for (const [key, value] of Object.entries(extractedData)) {
            if (value) {
                encryptedData[key] = encryptText(value, encryptionKey);
            }
        }

        console.log("Encrypted Data:", JSON.stringify(encryptedData));

        // Save data in MongoDB
        const userAadhaarData = new User({
            email,
            name,
            aadhaarData: encryptedData,
        });
        await userAadhaarData.save();

        console.log("Aadhaar data saved to database");

        // Generate JWT token
        const token = jwt.sign({ id: extractedData.aadhaarNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const responsePayload = { data: encryptedData, token };

        // Remove the file after processing
        fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete the file:", err);
        });

        // Send response
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(responsePayload);

    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: 'Error processing image' });
        fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete the file:", err);
        });
    }
};

export { processAadhaarImage };

