// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AadhaarStorage {
    struct AadhaarDetails {
        string name;
        string dob;
        string gender;
        string aadhaarNumber;
    }

    mapping(address => AadhaarDetails) public aadhaarDetails;

    event AadhaarDetailsStored(
        address indexed user,
        string name,
        string dob,
        string gender,
        string aadhaarNumber
    );

    function storeAadhaarDetails(
        string memory _name,
        string memory _dob,
        string memory _gender,
        string memory _aadhaarNumber
    ) public {
        aadhaarDetails[msg.sender] = AadhaarDetails(_name, _dob, _gender, _aadhaarNumber);
        emit AadhaarDetailsStored(msg.sender, _name, _dob, _gender, _aadhaarNumber);
    }

    function getAadhaarDetails(address user) public view returns (AadhaarDetails memory) {
        return aadhaarDetails[user];
    }

    function updateAadhaarDetails(
        string memory _name,
        string memory _dob,
        string memory _gender,
        string memory _aadhaarNumber
    ) public {
        require(bytes(aadhaarDetails[msg.sender].aadhaarNumber).length != 0, "Aadhaar details not found");
        aadhaarDetails[msg.sender] = AadhaarDetails(_name, _dob, _gender, _aadhaarNumber);
        emit AadhaarDetailsStored(msg.sender, _name, _dob, _gender, _aadhaarNumber);
    }

    function deleteAadhaarDetails() public {
        require(bytes(aadhaarDetails[msg.sender].aadhaarNumber).length != 0, "Aadhaar details not found");
        delete aadhaarDetails[msg.sender];
    }
}
