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
    "function storeName(string memory _name) public",
    "function storeDob(string memory _dob) public",
    "function storeGender(string memory _gender) public",
    "function storeAadhaarNumber(string memory _aadhaarNumber) public",
    "function storeFatherName(string memory _fatherName) public",
    "function storeUserAddress(string memory _userAddress) public",
    "function storePincode(string memory _pincode) public",
    "function storePhoneNumber(string memory _phoneNumber) public"
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

const storeAadhaarDetails = async (details) => {
    try {
        const tx = await contract.storeName(details.name, { gasLimit: 300000 });
        await tx.wait();
        console.log('Name stored:', tx.hash);

        const tx2 = await contract.storeDob(details.dob, { gasLimit: 300000 });
        await tx2.wait();
        console.log('Date of Birth stored:', tx2.hash);

        const tx3 = await contract.storeGender(details.gender, { gasLimit: 300000 });
        await tx3.wait();
        console.log('Gender stored:', tx3.hash);

        const tx4 = await contract.storeAadhaarNumber(details.aadhaarNumber, { gasLimit: 300000 });
        await tx4.wait();
        console.log('Aadhaar Number stored:', tx4.hash);

        const tx5 = await contract.storeFatherName(details.fatherName, { gasLimit: 300000 });
        await tx5.wait();
        console.log('Father Name stored:', tx5.hash);

        const tx6 = await contract.storeUserAddress(details.userAddress, { gasLimit: 300000 });
        await tx6.wait();
        console.log('Address stored:', tx6.hash);

        const tx7 = await contract.storePincode(details.pincode, { gasLimit: 300000 });
        await tx7.wait();
        console.log('Pincode stored:', tx7.hash);

        const tx8 = await contract.storePhoneNumber(details.phoneNumber, { gasLimit: 300000 });
        await tx8.wait();
        console.log('Phone Number stored:', tx8.hash);

    } catch (error) {
        console.error('Error storing data on chain:', error);
        throw error;
    }
}; 

module.exports = {
    storeAadhaarDetails
};
