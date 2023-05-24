import React from 'react';
import { useLocalStorage } from 'react-use';

const App = () => {
  // Initialize counters with values from localStorage or zero
  const [counter1, setCounter1] = useLocalStorage('counter1', 0);
  const [counter2, setCounter2] = useLocalStorage('counter2', 0);
  const [counter3, setCounter3] = useLocalStorage('counter3', 0);
  const [counter4, setCounter4] = useLocalStorage('counter4', 0);

  // Handle key presses
  const handleKeyPress = (event) => {
    switch(event.key) {
      case '1':
        setCounter1(counter1 + 1);
        break;
      case '2':
        setCounter2(counter2 + 1);
        break;
      case '3':
        setCounter3(counter3 + 1);
        break;
      case '4':
        setCounter4(counter4 + 1);
        break;
      default:
        break;
    }
  }

  // Attach key press handler
  React.useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);

    // Cleanup function
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    }
  }, [counter1, counter2, counter3, counter4]);

  return (
    <div>
      <p>Press a key (1, 2, 3, 4) to increment the corresponding counter.</p>
      <div>Counter 1: {counter1}</div>
      <div>Counter 2: {counter2}</div>
      <div>Counter 3: {counter3}</div>
      <div>Counter 4: {counter4}</div>
    </div>
  );
};

export default App;
