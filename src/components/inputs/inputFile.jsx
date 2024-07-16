import React from 'react';
import "../../styles/ComponentStyles/input.css"

const InputField = ({ label, id, type, value, onChange, placeholder }) => {
  return (
    <div className='inputContainer'>
      <label className='labelLogin' htmlFor={id}>{label}:</label>
      <input
        className="input"
        placeholder={placeholder}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default InputField;







