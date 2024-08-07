const { ethers } = require("hardhat");
const fetch = require('node-fetch');
const dotenv = require("dotenv");
dotenv.config();

async function storeDetails(details) {
    const [deployer] = await ethers.getSigners();
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const abi = [
        "function storeDetails(string memory name, string memory dob, string memory gender, string memory aadhaarNumber) public"
    ];
    const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const AadhaarStorage = await ethers.getContractFactory("AadhaarStorage");
    const aadhaarStorage = AadhaarStorage.attach(contractAddress);

    const tx = await aadhaarStorage.storeAadhaarDetails(
        details.name,
        details.dob,
        details.gender,
        details.aadhaarNumber
    );

    await tx.wait();
    console.log("Details stored successfully!");
}

async function extractAndStoreAadhaarDetails(imagePath) {
    const { data: { text } } = await tesseract.recognize(imagePath);
    const details = {
        name: extractName(text),
        dob: extractDob(text),
        gender: extractGender(text),
        aadhaarNumber: extractAadhaarNumber(text)
    };
    console.log("Data:", JSON.stringify(details));
    await storeDetails(details);
}

// Call your extractAndStoreAadhaarDetails function with the image path
// extractAndStoreAadhaarDetails("path/to/your/aadhaar/image.png");

// Implement extractName, extractDob, extractGender, extractAadhaarNumber functions
