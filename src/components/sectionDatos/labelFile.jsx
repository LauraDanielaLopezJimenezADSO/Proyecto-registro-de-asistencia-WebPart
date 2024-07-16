import React from 'react';
import "../../styles/ComponentStyles/label.css"

const LabelField = ({ label, id, type, buttonText}) => {
  return (
    <div className='labelContainer'>
      <div className='cont'>
        <label className='cont__labelDatos' htmlFor={id}>{label}:</label>
        <button
          className="labelD"
          type={type}
          id={id}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default LabelField;