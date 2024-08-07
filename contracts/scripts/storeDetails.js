const { ethers } = require("hardhat");
const fetch = require('node-fetch');
const dotenv = require("dotenv");
const tesseract = require('tesseract.js'); // Ensure you have tesseract.js installed

dotenv.config();

// Update the ABI to match your contract functions
const abi = [
    "function storeName(string memory _name) public",
    "function storeDob(string memory _dob) public",
    "function storeGender(string memory _gender) public",
    "function storeAadhaarNumber(string memory _aadhaarNumber) public",
    "function storeFatherName(string memory _fatherName) public",
    "function storeUserAddress(string memory _userAddress) public",
    "function storePincode(string memory _pincode) public",
    "function storePhoneNumber(string memory _phoneNumber) public"
];

async function storeDetails(details) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, abi, wallet);

    try {
        // Store details on-chain by calling the respective functions
        let tx = await contract.storeName(details.name);
        await tx.wait();
        console.log("Name stored:", tx.hash);

        tx = await contract.storeDob(details.dob);
        await tx.wait();
        console.log("Date of Birth stored:", tx.hash);

        tx = await contract.storeGender(details.gender);
        await tx.wait();
        console.log("Gender stored:", tx.hash);

        tx = await contract.storeAadhaarNumber(details.aadhaarNumber);
        await tx.wait();
        console.log("Aadhaar Number stored:", tx.hash);

        tx = await contract.storeFatherName(details.fatherName);
        await tx.wait();
        console.log("Father Name stored:", tx.hash);

        tx = await contract.storeUserAddress(details.userAddress);
        await tx.wait();
        console.log("User Address stored:", tx.hash);

        tx = await contract.storePincode(details.pincode);
        await tx.wait();
        console.log("Pincode stored:", tx.hash);

        tx = await contract.storePhoneNumber(details.phoneNumber);
        await tx.wait();
        console.log("Phone Number stored:", tx.hash);

    } catch (error) {
        console.error('Error storing data on chain:', error);
        throw error;
    }
}

async function extractAndStoreAadhaarDetails(imagePath) {
    try {
        const { data: { text } } = await tesseract.recognize(imagePath);
        const details = {
            name: extractName(text),
            dob: extractDob(text),
            gender: extractGender(text),
            aadhaarNumber: extractAadhaarNumber(text),
            fatherName: extractFatherName(text), // Ensure these functions exist
            userAddress: extractAddress(text),
            pincode: extractPincode(text),
            phoneNumber: extractPhoneNumber(text)
        };
        console.log("Data:", JSON.stringify(details));
        await storeDetails(details);
    } catch (error) {
        console.error('Error extracting or storing Aadhaar details:', error);
    }
}

// Implement these functions according to your extraction logic
function extractName(text) {
    const namePattern = /Name\s*:\s*(.*)/i; // Adjust regex based on actual text format
    const match = text.match(namePattern);
    return match ? match[1].trim() : '';
}

function extractDob(text) {
    const dobPattern = /Date of Birth\s*:\s*(\d{2}\/\d{2}\/\d{4})/i; // Adjust regex based on actual text format
    const match = text.match(dobPattern);
    return match ? match[1].trim() : '';}

function extractGender(text) {
    const genderPattern = /Gender\s*:\s*(Male|Female)/i; // Adjust regex based on actual text format
    const match = text.match(genderPattern);
    return match ? match[1].trim() : '';}

function extractAadhaarNumber(text) {
        const aadhaarPattern = /Aadhaar No\.\s*:\s*(\d{4}\s*\d{4}\s*\d{4})/i; // Adjust regex based on actual text format
        const match = text.match(aadhaarPattern);
        return match ? match[1].trim().replace(/\s+/g, '') : ''; // Remove spaces if necessary
    }

function extractFatherName(text) {
        const fatherNamePattern = /Father's Name\s*:\s*(.*)/i; // Adjust regex based on actual text format
        const match = text.match(fatherNamePattern);
        return match ? match[1].trim() : '';
    }
    
function extractAddress(text) {
    const addressPattern = /Address\s*:\s*([\s\S]*?)\s*Pincode/i; // Adjust regex based on actual text format
    const match = text.match(addressPattern);
    return match ? match[1].trim() : '';}

function extractPincode(text) {
    const pincodePattern = /Pincode\s*:\s*(\d{6})/i; // Adjust regex based on actual text format
    const match = text.match(pincodePattern);
    return match ? match[1].trim() : '';}

function extractPhoneNumber(text) {
    const phonePattern = /Phone\s*:\s*(\d{10})/i; // Adjust regex based on actual text format
    const match = text.match(phonePattern);
    return match ? match[1].trim() : '';}

// Call your extractAndStoreAadhaarDetails function with the image path
// extractAndStoreAadhaarDetails("path/to/your/aadhaar/image.png");
