// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AadhaarStorage {
    struct AadhaarDetails {
        string name;
        string dob;
        string gender;
        string aadhaarNumber;
        string fatherName;
        string userAddress;
        string pincode;
        string phoneNumber;
    }

    mapping(address => AadhaarDetails) public aadhaarDetails;

    event AadhaarDetailsStored(
        address indexed user,
        string name,
        string dob,
        string gender,
        string aadhaarNumber,
        string fatherName,
        string userAddress,
        string pincode,
        string phoneNumber
    );

    function storeDetails(
        string memory _name,
        string memory _dob,
        string memory _gender,
        string memory _aadhaarNumber,
        string memory _fatherName,
        string memory _userAddress,
        string memory _pincode,
        string memory _phoneNumber
    ) public {
        aadhaarDetails[msg.sender] = AadhaarDetails({
            name: _name,
            dob: _dob,
            gender: _gender,
            aadhaarNumber: _aadhaarNumber,
            fatherName: _fatherName,
            userAddress: _userAddress,
            pincode: _pincode,
            phoneNumber: _phoneNumber
        });

        emit AadhaarDetailsStored(
            msg.sender,
            _name,
            _dob,
            _gender,
            _aadhaarNumber,
            _fatherName,
            _userAddress,
            _pincode,
            _phoneNumber
        );
    }

    function getAadhaarDetails(address user) public view returns (AadhaarDetails memory) {
        return aadhaarDetails[user];
    }

    function deleteAadhaarDetails() public {
        require(bytes(aadhaarDetails[msg.sender].aadhaarNumber).length != 0, "Aadhaar details not found");
        delete aadhaarDetails[msg.sender];
    }
}
