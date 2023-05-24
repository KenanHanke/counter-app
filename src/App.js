import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Table, TableBody, TableRow, TableCell, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';

const App = () => {
  const [counters, setCounters] = useState(
    Array(10).fill(0).map((_, index) => localStorage.getItem(`counter${index + 1}`) || 0)
  );

  const [labels, setLabels] = useState(
    Array(10).fill("").map((_, index) => localStorage.getItem(`label${index + 1}`) || "")
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
    const defaultLabels = Array(10).fill("");
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

  const CountersTable = ({ start, end }) => (
    <Table>
      <TableBody>
        {counters.slice(start, end).map((counter, index) => (
          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { borderBottom: 0 } }}>
            <TableCell>
              <Typography variant="overline" display="block">
                Counter
              </Typography>
              <Typography variant="body1" display="block" sx={{textAlign: 'center'}}>
                No. {start + index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h2">
                {counter}
              </Typography>
            </TableCell>
            <TableCell>
              <TextField
                fullWidth
                placeholder='Add a label'
                value={labels[start + index]}
                onChange={(e) => handleChangeLabel(start + index, e)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Counters
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Press a number key to increment the corresponding counter.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '20px'}}>
        <Button variant="contained" color="primary" onClick={() => { handleResetCounters(); handleResetLabels(); }}>Reset everything</Button>
        <Button variant="outlined" onClick={handleResetCounters}>Reset counters</Button>
        <Button variant="outlined" onClick={handleResetLabels}>Reset labels</Button>
      </Box>
      <Grid container spacing={3}>
        {[0, 1].map((_, index) => (
          <Grid item xs={6} key={index}>
            <CountersTable start={index * 5} end={(index + 1) * 5} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;