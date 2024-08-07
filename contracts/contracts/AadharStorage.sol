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

    function storeName(string memory _name) public {
        aadhaarDetails[msg.sender].name = _name;
        emit AadhaarDetailsStored(
            msg.sender,
            _name,
            aadhaarDetails[msg.sender].dob,
            aadhaarDetails[msg.sender].gender,
            aadhaarDetails[msg.sender].aadhaarNumber,
            aadhaarDetails[msg.sender].fatherName,
            aadhaarDetails[msg.sender].userAddress,
            aadhaarDetails[msg.sender].pincode,
            aadhaarDetails[msg.sender].phoneNumber
        );
    }

    function storeDob(string memory _dob) public {
        aadhaarDetails[msg.sender].dob = _dob;
        emit AadhaarDetailsStored(
            msg.sender,
            aadhaarDetails[msg.sender].name,
            _dob,
            aadhaarDetails[msg.sender].gender,
            aadhaarDetails[msg.sender].aadhaarNumber,
            aadhaarDetails[msg.sender].fatherName,
            aadhaarDetails[msg.sender].userAddress,
            aadhaarDetails[msg.sender].pincode,
            aadhaarDetails[msg.sender].phoneNumber
        );
    }

    function storeGender(string memory _gender) public {
        aadhaarDetails[msg.sender].gender = _gender;
        emit AadhaarDetailsStored(
            msg.sender,
            aadhaarDetails[msg.sender].name,
            aadhaarDetails[msg.sender].dob,
            _gender,
            aadhaarDetails[msg.sender].aadhaarNumber,
            aadhaarDetails[msg.sender].fatherName,
            aadhaarDetails[msg.sender].userAddress,
            aadhaarDetails[msg.sender].pincode,
            aadhaarDetails[msg.sender].phoneNumber
        );
    }

    function storeAadhaarNumber(string memory _aadhaarNumber) public {
        aadhaarDetails[msg.sender].aadhaarNumber = _aadhaarNumber;
        emit AadhaarDetailsStored(
            msg.sender,
            aadhaarDetails[msg.sender].name,
            aadhaarDetails[msg.sender].dob,
            aadhaarDetails[msg.sender].gender,
            _aadhaarNumber,
            aadhaarDetails[msg.sender].fatherName,
            aadhaarDetails[msg.sender].userAddress,
            aadhaarDetails[msg.sender].pincode,
            aadhaarDetails[msg.sender].phoneNumber
        );
    }

    function storeFatherName(string memory _fatherName) public {
        aadhaarDetails[msg.sender].fatherName = _fatherName;
        emit AadhaarDetailsStored(
            msg.sender,
            aadhaarDetails[msg.sender].name,
            aadhaarDetails[msg.sender].dob,
            aadhaarDetails[msg.sender].gender,
            aadhaarDetails[msg.sender].aadhaarNumber,
            _fatherName,
            aadhaarDetails[msg.sender].userAddress,
            aadhaarDetails[msg.sender].pincode,
            aadhaarDetails[msg.sender].phoneNumber
        );
    }

    function storeUserAddress(string memory _userAddress) public {
        aadhaarDetails[msg.sender].userAddress = _userAddress;
        emit AadhaarDetailsStored(
            msg.sender,
            aadhaarDetails[msg.sender].name,
            aadhaarDetails[msg.sender].dob,
            aadhaarDetails[msg.sender].gender,
            aadhaarDetails[msg.sender].aadhaarNumber,
            aadhaarDetails[msg.sender].fatherName,
            _userAddress,
            aadhaarDetails[msg.sender].pincode,
            aadhaarDetails[msg.sender].phoneNumber
        );
    }

    function storePincode(string memory _pincode) public {
        aadhaarDetails[msg.sender].pincode = _pincode;
        emit AadhaarDetailsStored(
            msg.sender,
            aadhaarDetails[msg.sender].name,
            aadhaarDetails[msg.sender].dob,
            aadhaarDetails[msg.sender].gender,
            aadhaarDetails[msg.sender].aadhaarNumber,
            aadhaarDetails[msg.sender].fatherName,
            aadhaarDetails[msg.sender].userAddress,
            _pincode,
            aadhaarDetails[msg.sender].phoneNumber
        );
    }

    function storePhoneNumber(string memory _phoneNumber) public {
        aadhaarDetails[msg.sender].phoneNumber = _phoneNumber;
        emit AadhaarDetailsStored(
            msg.sender,
            aadhaarDetails[msg.sender].name,
            aadhaarDetails[msg.sender].dob,
            aadhaarDetails[msg.sender].gender,
            aadhaarDetails[msg.sender].aadhaarNumber,
            aadhaarDetails[msg.sender].fatherName,
            aadhaarDetails[msg.sender].userAddress,
            aadhaarDetails[msg.sender].pincode,
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
