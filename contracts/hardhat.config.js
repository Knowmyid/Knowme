require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();



module.exports = {
  solidity: "0.8.0",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    polygonAmoy: { 
      url: process.env.POLYGON_RPC_URL, 
      accounts: [process.env.PRIVATE_KEY] 
    },
  }
};