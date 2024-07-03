// AComponent.jsx
import React, { useState } from 'react';
import CComponent from './CComponent';

const AComponent = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <CComponent increment={increment} decrement={decrement} reset={reset} />
    </div>
  );
};

export default AComponent;

