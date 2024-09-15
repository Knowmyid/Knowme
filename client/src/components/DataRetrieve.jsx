import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import CustomCheckbox from '../components/CustomCheck.jsx';
import { FaUser, FaCalendar, FaHome, FaPhone, FaGenderless } from 'react-icons/fa'; // Example icons from react-icons
import { HiIdentification } from "react-icons/hi2";
import { TbMapPinCode } from "react-icons/tb";
import gif1 from '../assets/gif1.gif';
import { FaUserFriends } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { API_URL, fetchUserData } from '../apiClient.js';
import { useAuth0 } from "@auth0/auth0-react";

const DataRetrieve = () => {
  const location = useLocation();
  const { user } = useAuth0();
  
  const [aadharData, setAadharData] = useState(null); // state to store fetched data
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchUserData(user.email);
        setAadharData(data.aadhaarData); // set data when fetch completes
      } catch (error) {
        console.error("Error fetching Aadhaar data:", error);
      }
    };
    getData(); // fetch user data on component mount
  }, [user.email]);

  const handleCheckboxChange = (detail) => {
    setSelectedDetails((prevSelected) =>
      prevSelected.includes(detail)
        ? prevSelected.filter((item) => item !== detail)
        : [...prevSelected, detail]
    );
  };
  console.log(JSON.stringify(aadharData));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aadharData) {
      const dataToShare = selectedDetails.reduce((acc, detail) => {
        acc[detail] = aadharData[detail];
        return acc;
      }, {});

      dataToShare.email = user.email;

      const uniqueId = uuidv4();
      const middleUrl = `${API_URL}/track-scan/${uniqueId}?data=${encodeURIComponent(JSON.stringify(dataToShare))}`;
      setQrData(middleUrl); 
    }
  };

  const icons = {
    name: <FaUser />,
    dob: <FaCalendar />,
    address: <FaHome />,
    gender: <FaGenderless />,
    phoneNumber: <FaPhone />,
    fatherName: <FaUserFriends />,
    pincode: <TbMapPinCode />,
    aadhaarNumber: <HiIdentification />,
  };

  if (!aadharData) {
    return <div>Loading...</div>; // show loading state while fetching data
  }

  return (
    <div className="min-h-screen w-full mx-auto p-4 flex flex-col items-center justify-start bg-discount-gradient">
      <div className="flex flex-col md:flex-row items-center w-full max-w-4xl gap-8">
        <div className="md:w-1/3 w-full flex justify-center mb-4 md:mb-0">
          <img src={gif1} alt='img' className='w-[300px] rounded-full' />
        </div>
        <div className="md:w-2/3 w-full flex flex-col items-center md:items-end">
          <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Select Aadhaar Details to Share</h2>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {Object.keys(aadharData).map((detail) => (
                <CustomCheckbox
                  key={detail}
                  icon={icons[detail]}
                  label={detail.charAt(0).toUpperCase() + detail.slice(1)}
                  checked={selectedDetails.includes(detail)}
                  onChange={() => handleCheckboxChange(detail)}
                  className="flex-shrink-0"
                />
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
            >
              Generate QR Code
            </button>
          </form>
          {qrData && (
            <div className="flex flex-col mt-8 text-center md:text-right w-full items-center">
              <h3 className="text-lg text-white font-semibold mb-2">Generated QR Code</h3>
              <div className="flex justify-center items-center md:justify-end w-full">
                <QRCode
                  value={qrData}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="Q"
                  includeMargin={true}
                  renderAs="svg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataRetrieve;
