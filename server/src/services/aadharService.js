// src/services/aadharService.js

const { ethers } = require('ethers');
const dotenv = require('dotenv');

dotenv.config();

if (!process.env.POLYGON_RPC_URL || !process.env.PRIVATE_KEY || !process.env.CONTRACT_ADDRESS) {
    throw new Error('Missing environment variables');
}

const provider = new ethers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
    "function storeDetails(string memory name, string memory dob, string memory gender, string memory aadhaarNumber) public"
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

const storeAadhaarDetails = async (details) => {
    try {
        const tx = await contract.storeDetails(
            details.name,
            details.dob,
            details.gender,
            details.aadhaarNumber
        );
        await tx.wait();
        console.log('Transaction successful:', tx.hash);
    } catch (error) {
        console.error('Error storing data on chain:', error);
        throw error;
    }
};

module.exports = {
    storeAadhaarDetails
};
