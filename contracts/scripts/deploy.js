const { log } = require('console');

async function main() {
    const AadhaarStorage = await ethers.getContractFactory("AadhaarStorage");
    const aadhaarStorage = await AadhaarStorage.deploy();
    await aadhaarStorage.deploymentTransaction().wait();
    // await aadhaarStorage.deployed();
    console.log("AadhaarStorage deployed to:", JSON.stringify(aadhaarStorage.target));

    // Optionally, save the address to a file for later use
    const fs = require('fs');
    fs.writeFileSync(
        './deployedAddress.json',
        
        JSON.stringify({ address: aadhaarStorage.address }, null, 2)
    );
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
