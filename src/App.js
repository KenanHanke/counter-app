import React, { useState, useEffect } from 'react';

const App = () => {
  const [counters, setCounters] = useState(
    Array(10).fill(0).map((_, index) => localStorage.getItem(`counter${index + 1}`) || 0)
  );

  const [labels, setLabels] = useState(
    Array(10).fill("Counter").map((label, index) => localStorage.getItem(`label${index + 1}`) || label)
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

  const handleResetCounters = () => {
    const resetCounters = Array(10).fill(0);
    setCounters(resetCounters);
    resetCounters.forEach((_, index) => localStorage.setItem(`counter${index + 1}`, 0));
  };

  const handleResetLabels = () => {
    const defaultLabels = Array(10).fill("Counter");
    setLabels(defaultLabels);
    defaultLabels.forEach((label, index) => localStorage.setItem(`label${index + 1}`, label));
  };

  const handleChangeLabel = (index, event) => {
    const newLabels = [...labels];
    newLabels[index] = event.target.value;
    setLabels(newLabels);
    localStorage.setItem(`label${index + 1}`, newLabels[index]);
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
      <button onClick={() => { handleResetCounters(); handleResetLabels(); }}>Reset everything</button>
      <button onClick={handleResetCounters}>Reset counters</button>
      <button onClick={handleResetLabels}>Reset labels</button>
      {counters.map((counter, index) => (
        <div key={index}>Counter {(index + 1) % 10}:{counter}
          <input type="text" value={labels[index]} onChange={(e) => handleChangeLabel(index, e)} />
        </div>
      ))}
    </div>
  );
};

export default App;
