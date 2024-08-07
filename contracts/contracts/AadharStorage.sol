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

    function storeAadhaarDetails(
        string memory _name,
        string memory _dob,
        string memory _gender,
        string memory _aadhaarNumber
    ) public {
        aadhaarDetails[msg.sender] = AadhaarDetails(_name, _dob, _gender, _aadhaarNumber);
    }

    function getAadhaarDetails(address user) public view returns (AadhaarDetails memory) {
        return aadhaarDetails[user];
    }
}
