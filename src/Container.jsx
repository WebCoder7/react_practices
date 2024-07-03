import React from 'react';

const Container = ({ color }) => {
  return (
    <div style={{ backgroundColor: color, width: '100%', height: '100vh' }}>
      This is the container
    </div>
  );
};

export default Container;