# VOID
This project integrates with [AnonAadhar](https://github.com/anon-aadhaar/anon-aadhaar), [PolygonAmoy](https://docs.polygon.technology/tools/), [Thegraph](https://thegraph.com/studio/) to securely manage and share Aadhaar details on the blockchain on Amoy testnet and fetch them through queries in the Graph.

## Overview
VOID allows users to upload their Aadhaar or other documents for verification. Once the document is verified and authenticated, users can filter their Aadhaar details and generate a QR code that can be scanned to reveal the selected information.
Refer to this given video for the working of the project [VOID](https://www.youtube.com/watch?v=jxPi742b5sE)

### To review the working of the deployed site visit [VOID](https://knowme-zc44.onrender.com/)

## Features
Document Upload: Users can upload Aadhaar or other documents for verification.
Verification: Utilizes Anonaadhar to authenticate the Aadhaar details.
Dashboard: Post-verification, users access a dashboard to filter Aadhaar details.
QR Code Generation: Filtered Aadhaar details can be encoded into a QR code.

## Tech Stack
Polygon Amoy: Used for the blockchain network and deploying the aadhar details on chain
Anonaadhar: Used for Aadhaar verification.
TheGraph: Used to query the blockchain data.

## Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js and npm installed on your local machine.
A MetaMask wallet configured with the [PolygonAmoy](https://support.polygon.technology/support/solutions/articles/82000907114-how-to-add-amoy-network-in-your-wallet-).
Anonaadhar integration for Aadhaar verification.
A valid Aadhaar document or equivalent for testing.
Studio for deployment of SubGraph

## Installation
Clone the repository:
```
mkdir void
cd void
git clone [https://github.com/your-username/your-dapp-repo.git](https://github.com/Knowmyid/void)
```
Create a .env file in the root directory and add the following
```
CONTRACT_ADDRESS
POLYGON_RPC_URL
PRIVATE_KEY
```
You could us Alchemy or Infura to get RPC_URL and PRIVATE_KEY


Navigate to the project directory:
```
cd client
npm i
npm run start


bash
cd server
npm i
```
create a .env file and enter 
```
CONTRACT_ADDRESS
POLYGON_RPC_URL
PRIVATE_KEY
JWT_SECRET
ENCRYPTION_KEY

bash
cd contracts
```
create a .env file and enter 
```
CONTRACT_ADDRESS
POLYGON_RPC_URL
PRIVATE_KEY
```
Starting backend port
```
cd server
nodemon index.js
```
### Executions in the server

Data extracted into the server is encrypted using bcryptjs and then deployed on chain using Amoy testnet.
This happens the moment you upload your aadhar card you could check the logs using alchemy or on [AmoyBlockExplorer](https://www.oklink.com/amoy)
Then the data could be fetched using the TheGraph's studio by using queries like to fetch details.
```
{
  aadhaarNumberStoreds(first: 1) {
    id
    user
    aadhaarNumber
    blockNumber
  }
  dobStoreds(first: 1) {
    id
    user
    dob
    blockNumber
  }
}
```
Please visit the following link to get entire working model and concepts used in this project.

[https://devfolio.co/projects/void-verification-and-optimization-of-ids-8c1e](https://devfolio.co/projects/void-verification-and-optimization-of-ids-8c1e)



