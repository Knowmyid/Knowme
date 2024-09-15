# Void - Verification and optimization of ID's

## Overview
Void is a decentralized application (dApp) designed to revolutionize identity verification and fetching realtime details through ID's. In scenarios like hotel check-ins, where you typically submit your Aadhaar card containing sensitive personal information, Void allows you to prove your identity without revealing unnecessary details. Our platform encrypts and decrypts documents in a way that only the required, filtered information is revealed, ensuring your privacy.
Deployed at [https://knowme-zc44.onrender.com/](https://knowme-zc44.onrender.com/)

The application leverages 
Polygon for smart contracts
Anonaadhar for Aadhaar verification
TheGraph for querying blockchain data
The result is a seamless experience where the user simply uploads a document and selects the details to reveal. All the verification, authorization, and contract deployment happens instantly, ensuring user privacy. Additionally, authorities can perform real-time monitoring in tourist areas through graph queries for any discrepancies.
Refer this video for the complete working of the project [https://youtu.be/XmjFi2pTq4s](https://youtu.be/XmjFi2pTq4s)

## Features
- **Document Upload**: Upload your Aadhaar or other documents for verification.
- **Verification**: Authenticate your Aadhaar details using Anonaadhar.
- **Dashboard**: Filter the information you wish to share.
- **QR Code Generation**: Generate a QR code with the selected details for easy sharing.

## Tech Stack
- **React & Node.js**: Frontend and backend development.
- **Polygon**: Blockchain network for smart contracts.
- **Anonaadhar**: Aadhaar verification API.
- **TheGraph**: Blockchain data querying tool.

To view the current existing contract address visit [Polygon Amoy Testnet](https://www.oklink.com/amoy/address/0xa6bf888bdf97045240fcf1cbaddb319a594ec2a5)

Watch the video to understand the integration of The Graph in the project [TheGraph](https://drive.google.com/file/d/15SiSRo5JVLCGJvVKhSqnuqffL3gDtA-5/view?usp=sharing)

## Prerequisites
Before you begin, ensure you have the following:

- Node.js and npm installed.
- A MetaMask wallet configured with the Polygon Amoy network.
- An Anonaadhar API key.
- A valid Aadhaar document or equivalent for testing.
- Access to Thegraph for querying

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Knowmyid/void.git
    ```

2. Navigate to the `client` directory and install the dependencies:

    ```bash
    cd void/client
    npm install
    ```

3. Navigate to the `server` directory and install the dependencies:

    ```bash
    cd ../server
    npm install
    ```

4. Create a `.env` file in the `server` directory and add the following:

    ```makefile
    CONTRACT_ADDRESS=your_contract_address
    POLYGON_RPC_URL=your_polygon_rpc_url
    PRIVATE_KEY=your_private_key
    JWT_SECRET=your_jwt_secret
    ENCRYPTION_KEY=your_encryption_key
    ```

5. Navigate to the `contracts` directory and install the dependencies:

    ```bash
    cd ../contracts
    npm install
    ```

6. Create a `.env` file in the `contracts` directory and add the following:

    ```makefile
    CONTRACT_ADDRESS=your_contract_address
    POLYGON_RPC_URL=your_polygon_rpc_url
    PRIVATE_KEY=your_private_key
    ```

## Usage

1. Start the client:

    ```bash
    cd ../client
    npm run dev
    ```

2. Start the server:

    ```bash
    cd ../server
    nodemon index
    ```

3. **Upload Document**: On the dashboard, upload your Aadhaar or another document.
4. **Verification**: The document is verified using Anonaadhar. If valid, you are authenticated.
5. **Filter Details**: Select the details you want to share using the dashboard.
6. **Generate QR Code**: A QR code is generated with the selected details.

## Deployment

To deploy Void on a live environment:

1. Build the project:

    ```bash
    npm run build
    ```

2. Deploy to a hosting service like Vercel, Netlify, or directly on IPFS.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Make your changes.
4. Commit your changes: `git commit -m 'Add some feature'`.
5. Push to the branch: `git push origin feature-branch`.
6. Create a Pull Request.

To view all the concepts and links related to the project visit
[https://devfolio.co/projects/void-verification-and-optimization-of-ids-8c1e](https://devfolio.co/projects/void-verification-and-optimization-of-ids-8c1e)

---

Thank you for using Void! Your privacy is our priority.
