import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import CustomCheckbox from '../components/CustomCheck';
import { FaUser, FaCalendar, FaHome, FaPhone } from 'react-icons/fa'; // Example icons from react-icons
import gif1 from '../assets/gif1.gif'

const AadharForm = ({ aadharData = {}, }) => {
  const [selectedDetails, setSelectedDetails] = useState([]);
  const [qrData, setQrData] = useState('');
  console.log(JSON.stringify(aadharData));

  const handleCheckboxChange = (detail) => {
    setSelectedDetails((prevSelected) =>
      prevSelected.includes(detail)
        ? prevSelected.filter((item) => item !== detail)
        : [...prevSelected, detail]
    );
    console.log(JSON.stringify(selectedDetails));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToShare = selectedDetails.reduce((acc, detail) => {
      acc[detail] = aadharData[detail];
      return acc;
    }, {});
    console.log(JSON.stringify(dataToShare)); 
    setQrData(JSON.stringify(dataToShare));
  };

  const icons = {
    name: <FaUser />,
    dob: <FaCalendar />,
    address: <FaHome />,
    phone: <FaPhone />,
  };

  return (
    <div className="min-h-screen w-[100%] mx-auto p-4 flex h-[700px] flex-col items-center justify-center bg-gradient-to-r from-[#555555] to-black">
  <div className="flex flex-col md:flex-row items-start w-full max-w-4xl">
    <div className="md:w-1/3 w-full flex justify-center mb-4 md:mb-0">
      <img src={gif1}  alt='img' className='w-[300px] rounded-full'/>
    </div>
    <div className="md:w-2/3 w-full flex flex-col items-center md:items-end">
      <h2 className="text-2xl font-bold mt-10 mb-4 text-white">Select Aadhar Details to Share</h2>
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
        <div className="mt-4 text-right">
          <h3 className="text-lg text-white items-center justify-center font-semibold mb-2">Generated QR Code</h3>
          <QRCode value={qrData} />
        </div>
      )}
    </div>
  </div>
</div>

  );
};

export default AadharForm;