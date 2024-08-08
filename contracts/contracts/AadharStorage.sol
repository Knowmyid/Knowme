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

    event NameStored(address indexed user, string name);
    event DobStored(address indexed user, string dob);
    event GenderStored(address indexed user, string gender);
    event AadhaarNumberStored(address indexed user, string aadhaarNumber);
    event FatherNameStored(address indexed user, string fatherName);
    event UserAddressStored(address indexed user, string userAddress);
    event PincodeStored(address indexed user, string pincode);
    event PhoneNumberStored(address indexed user, string phoneNumber);

    function storeName(string memory _name) public {
        aadhaarDetails[msg.sender].name = _name;
        emit NameStored(msg.sender, _name);
    }

    function storeDob(string memory _dob) public {
        aadhaarDetails[msg.sender].dob = _dob;
        emit DobStored(msg.sender, _dob);
    }

    function storeGender(string memory _gender) public {
        aadhaarDetails[msg.sender].gender = _gender;
        emit GenderStored(msg.sender, _gender);
    }

    function storeAadhaarNumber(string memory _aadhaarNumber) public {
        aadhaarDetails[msg.sender].aadhaarNumber = _aadhaarNumber;
        emit AadhaarNumberStored(msg.sender, _aadhaarNumber);
    }

    function storeFatherName(string memory _fatherName) public {
        aadhaarDetails[msg.sender].fatherName = _fatherName;
        emit FatherNameStored(msg.sender, _fatherName);
    }

    function storeUserAddress(string memory _userAddress) public {
        aadhaarDetails[msg.sender].userAddress = _userAddress;
        emit UserAddressStored(msg.sender, _userAddress);
    }

    function storePincode(string memory _pincode) public {
        aadhaarDetails[msg.sender].pincode = _pincode;
        emit PincodeStored(msg.sender, _pincode);
    }

    function storePhoneNumber(string memory _phoneNumber) public {
        aadhaarDetails[msg.sender].phoneNumber = _phoneNumber;
        emit PhoneNumberStored(msg.sender, _phoneNumber);
    }

    function getAadhaarDetails(address user) public view returns (AadhaarDetails memory) {
        return aadhaarDetails[user];
    }

    function deleteAadhaarDetails() public {
        require(bytes(aadhaarDetails[msg.sender].aadhaarNumber).length != 0, "Aadhaar details not found");
        delete aadhaarDetails[msg.sender];
    }
}
