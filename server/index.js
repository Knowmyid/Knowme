const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const Jimp = require('jimp');
const { storeAadhaarDetails } = require("./src/services/aadharService");
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
const upload = multer({ dest: 'uploads/' });
dotenv.config();
app.use(express.json());

app.post('/api/upload/aadhar', upload.single('aadhaar'), async (req, res) => {
    const { path: filePath } = req.file;
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

        // Use Tesseract to extract text from the processed image
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');

        // Process the extracted text
        const extractedData = processExtractedTextAadhar(text);

        console.log("Data extracted from Aadhaar:", JSON.stringify(extractedData));

        const encryptionKey = process.env.ENCRYPTION_KEY;

        // Encrypt each field in the extracted data
        const encryptedData = {};
        for (const [key, value] of Object.entries(extractedData)) {
            if (value) {
                encryptedData[key] = encryptText(value, encryptionKey);
            }
        }

        console.log("Encrypted Data:", JSON.stringify(encryptedData));

        // Generate JWT token
        const token = jwt.sign({ id: extractedData.aadhaarNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const responsePayload = { data: extractedData, token };

        // Send the response immediately
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json(responsePayload);

        // After sending the response, store the Aadhaar details asynchronously
        storeAadhaarDetails(encryptedData)
            .then(() => {
                console.log('Aadhaar details stored successfully');
            })
            .catch((error) => {
                console.error('Error storing Aadhaar details:', error);
            });

        // Delete the file after processing asynchronously
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete the file:", err);
            } else {
                console.log("File deleted successfully");
            }
        });

    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: 'Error processing image' });

        // Attempt to delete the file even if there's an error
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Failed to delete the file:", err);
            } else {
                console.log("File deleted successfully");
            }
        });
    }
});



const processExtractedTextAadhar = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    const nameRegex = /\b([A-Z][a-z]+)(\s[A-Z][a-z]+){0,4}\b/g;
    const dateRegex = /\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\/\d{2}\/\d{4}\b/g;
    const genderMentionRegex = /\b(Male|Female|Other)\b/g;
    const aadhaarNumberRegex = /^\d{4}\s*\d{4}\s*\d{4}$/;
    const fatherNameRegex = /\bS\/[0O]:\s*([A-Za-z\s]+)\b/i;
    const phoneNumberRegex = /\b\d{10}\b/; // Assuming a 10-digit phone number format
    const pincodeRegex = /\b\d{6}\b/; // Assuming a 6-digit pincode format

    let name = '';
    let dob = '';
    let gender = ''; 
    let aadhaarNumber = '';
    let fatherName = '';
    let address = '';
    let phoneNumber = '';
    let pincode = '';

    for (let i = 0; i < lines.length; i++) {
        if (dateRegex.test(lines[i])) {
            dob = lines[i].match(dateRegex)[0];

            // Check the previous line for name
            if (i > 0 && nameRegex.test(lines[i - 1])) {
                name = lines[i - 1].match(nameRegex)[0];
            }
        }
    }

    const genderMatch = text.match(genderMentionRegex);
    if (genderMatch) {
        gender = genderMatch[0];
    }

    const aadhaarNumberMatch = lines.find(line => aadhaarNumberRegex.test(line));
    if (aadhaarNumberMatch) {
        aadhaarNumber = aadhaarNumberMatch.match(aadhaarNumberRegex)[0];
    }

    const fatherNameMatch = text.match(fatherNameRegex);
    if (fatherNameMatch) {
        fatherName = fatherNameMatch[0].replace('S/O:', '').trim();
    }

    // Extract address assuming it starts after the father's name and ends before the phone number
    if (fatherName) {
        const fatherNameIndex = lines.findIndex(line => line.includes(fatherName));
        if (fatherNameIndex !== -1) {
            for (let i = fatherNameIndex + 1; i < lines.length; i++) {
                if (phoneNumberRegex.test(lines[i])) {
                    break;
                }
                address += lines[i] + ' ';
            }
            address = address.trim();
        }
    }

    // Extract pincode from the address lines
    const pincodeMatch = address.match(pincodeRegex);
    if (pincodeMatch) {
        pincode = pincodeMatch[0];
    }

    const phoneNumberMatch = text.match(phoneNumberRegex);
    if (phoneNumberMatch) {
        phoneNumber = phoneNumberMatch[0];
    }

    return {
        name,
        dob,
        gender,
        aadhaarNumber,
        fatherName,
        address,
        pincode,
        phoneNumber
    };

};


function encryptText(text, key) {
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
}

function decryptText(encryptedText, key) {
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

app.get('/api/aadhar/details', async (req, res) => {
    try {
        const details = await fetchAadhaarDetails();
        res.status(200).json(details);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
});


// Define the port
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

