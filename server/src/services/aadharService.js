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
    "function storeAadhaarDetails(string name, string dob, string gender, string aadhaarNumber, string fatherName, string address, string pincode, string phoneNumber) public",
    "function getAadhaarDetails(address user) public view returns (tuple(string name, string dob, string gender, string aadhaarNumber, string fatherName, string address, string pincode, string phoneNumber))"
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

const storeAadhaarDetails = async (details) => {
    try {
        const tx = await contract.storeAadhaarDetails(
            details.name,
            details.dob,
            details.gender,
            details.aadhaarNumber,
            details.fatherName,
            details.address,
            details.pincode,
            details.phoneNumber
        );
        await tx.wait();
        console.log('Transaction successful:', tx.hash);
    } catch (error) {
        console.error('Error storing data on chain:', error);
        throw error;
    }
};

const getAadhaarDetails = async (userAddress) => {
    try {
        const details = await contract.getAadhaarDetails(userAddress);
        return details;
    } catch (error) {
        console.error('Error retrieving data from chain:', error);
        throw error;
    }
};

module.exports = {
    storeAadhaarDetails,
    getAadhaarDetails
};
