import React from 'react';

const formatLabel = (label) => {
  return label
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before capital letters
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2'); // Handle cases like "aadhaarNumber"
};



const CustomCheckbox = ({ icon, label, checked, onChange }) => {
  return (
    <div
      className={`custom-checkbox ${checked ? 'checked' : ''} flex items-center `}
      onClick={onChange}
    >
      <div className="icon text-center">{icon}</div>
      <div className="label text-center">{formatLabel(label)}</div>
    </div>
  );
};

export default CustomCheckbox;
