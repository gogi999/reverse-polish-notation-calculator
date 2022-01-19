import React from 'react';

const Input = ({ inputVal, handleChange }) => {
  return (
    <div className="input-container">
      <input 
        value={inputVal}
        onChange={handleChange}
        placeholder="Enter operand and operator: 2,6,5.5,4,*,-,+"
      />
    </div>
  );
}

export default Input;
