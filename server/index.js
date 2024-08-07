const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const Jimp = require('jimp');
const { storeAadhaarDetails } = require("./src/services/aadharService");
const dotenv = require('dotenv');

const app = express();
const upload = multer({ dest: 'uploads/' });
dotenv.config();

app.use(express.json());

app.post('/api/upload/aadhar', upload.single('aadhaar'), async (req, res) => {
    try {
        const { path } = req.file;
        const image = await Jimp.read(path);

        image
            .resize(1024, Jimp.AUTO)
            .quality(80)
            .contrast(0.5)
            .greyscale()
            .blur(1)
            .normalize()
            .writeAsync(path);

        // Use Tesseract to extract text from the processed image
        const { data: { text } } = await Tesseract.recognize(path, 'eng');

        // Process the extracted text
        const extractedData = processExtractedTextAadhar(text);

        console.log("Data: " + JSON.stringify(extractedData));

        await storeAadhaarDetails(extractedData);

        res.status(200).json(extractedData);
    } catch (error) {
        console.error("Error processing image:", error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

const processExtractedTextAadhar = (text) => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    const nameRegex = /\b([A-Z][a-z]+)(\s[A-Z][a-z]+){0,4}\b/g;
    const dateRegex = /\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\/\d{2}\/\d{4}\b/g;
    const genderMentionRegex = /\b(Male|Female|Other)\b/g;
    const aadhaarNumberRegex = /^\d{4}\s*\d{4}\s*\d{4}$/;
    const fatherNameRegex = /\bS\/0:\s*([A-Za-z\s]+)\b/i;
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
        console.log(`Processing line: ${lines[i]}`); // Debugging line
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
        console.log("Pattern Match: " + fatherNameMatch)
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

// Define the port
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
