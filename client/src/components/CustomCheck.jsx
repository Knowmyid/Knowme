import React from 'react';

const formatLabel = (label) => {
  return label
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'); // Handle cases like "aadhaarNumber"
};

const CustomCheckbox = ({ icon, label, checked, onChange }) => {
  return (
    <div
      className={`custom-checkbox flex items-center cursor-pointer p-2 rounded-lg transition-colors duration-300 ${checked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
      onClick={onChange}
    >
      <div className={`icon mr-2 text-xl transition-transform duration-300 ${checked ? 'transform scale-110' : ''}`}>
        {icon}
      </div>
      <div className="label font-medium transition-colors duration-300">
        {formatLabel(label)}
      </div>
    </div>
  );
};

export default CustomCheckbox;
