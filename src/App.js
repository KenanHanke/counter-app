import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Card, Box } from '@mui/material';
import { styled } from '@mui/system';

const CounterCard = styled(Card)({
  margin: '10px 0',
  padding: '10px',
});

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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Counters
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Press a number key to increment the corresponding counter.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
        <Button variant="contained" color="primary" onClick={() => { handleResetCounters(); handleResetLabels(); }}>Reset everything</Button>
        <Button variant="outlined" onClick={handleResetCounters}>Reset counters</Button>
        <Button variant="outlined" onClick={handleResetLabels}>Reset labels</Button>
      </Box>
      {counters.map((counter, index) => (
        <CounterCard key={index}>
          <Typography variant="h6" gutterBottom>
            {labels[index]} {(index + 1) % 10}: {counter}
          </Typography>
          <TextField
            fullWidth
            label="Label"
            value={labels[index]}
            onChange={(e) => handleChangeLabel(index, e)}
          />
        </CounterCard>
      ))}
    </Container>
  );
};

export default App;
