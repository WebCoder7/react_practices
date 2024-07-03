import React from 'react';

const MyInput = ({ color, setColor }) => {
  return (
    <input
      type="text"
      value={color}
      onChange={(e) => setColor(e.target.value)}
      placeholder="Enter color"
    />
  );
};

export default MyInput;