import React from 'react';

const CustomCheckbox = ({ icon, label, checked, onChange }) => {
  return (
    <div
      className={`custom-checkbox ${checked ? 'checked' : ''}`}
      onClick={onChange}
    >
      <div className="icon">{icon}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default CustomCheckbox;
