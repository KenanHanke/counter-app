import React, { useState, useEffect } from 'react';

const App = () => {
  const [counters, setCounters] = useState(
    Array(10).fill(0).map((_, index) => localStorage.getItem(`counter${index + 1}`) || 0)
  );

  const handleKeyPress = (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
      const index = key === '0' ? 9 : parseInt(key, 10) - 1;
      const newCounters = [...counters];
      newCounters[index] = parseInt(newCounters[index], 10) + 1;
      setCounters(newCounters);
      localStorage.setItem(`counter${index + 1}`, newCounters[index]);
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [counters]);

  return (
    <div>
      <p>Press a number key to increment the corresponding counter.</p>
      {counters.map((counter, index) => (
        <div key={index}>Counter {(index + 1) % 10}: {counter}</div>
      ))}
    </div>
  );
};

export default App;
