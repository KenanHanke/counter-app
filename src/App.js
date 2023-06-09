import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Container, Typography, Button, TextField, Table, TableBody, TableRow, TableCell, Box, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: deepPurple,
  },
});

const CountersTable = ({ counters, labels, start, end, handleChangeLabel, handleFocus, handleBlur, inputFocused }) => {
  const textFieldStyle = inputFocused ? { color: 'primary.main' } : {};

  return (
    <Table>
      <TableBody>
        {counters.slice(start, end).map((counter, index) => (
          <TableRow key={index} sx={{ '&:last-child td': { borderBottom: 0 } }}>
            <TableCell>
              <Box p={1}>
                <Typography variant="overline" display="block" sx={textFieldStyle}>
                  Counter
                </Typography>
                <Typography variant="body1" display="block" sx={{textAlign: 'center', ...textFieldStyle}}>
                  # {(start + index + 1) % 10}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box p={1}>
                <Typography variant="h2" sx={textFieldStyle}>
                  {counter}
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Box p={1}>
                <TextField
                  fullWidth
                  placeholder='Add a label'
                  value={labels[start + index]}
                  onChange={(e) => handleChangeLabel(start + index, e)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const App = () => {
  const [counters, setCounters] = useState(
    Array(10).fill(0).map((_, index) => localStorage.getItem(`counter${index + 1}`) || 0)
  );

  const [labels, setLabels] = useState(
    Array(10).fill("").map((_, index) => localStorage.getItem(`label${index + 1}`) || "")
  );

  const [inputFocused, setInputFocused] = useState(false);

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
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

  // This set will hold the keys currently being pressed
  const keysBeingPressed = useRef(new Set());

  const handleKeyDown = useCallback((event) => {
    // If a text field is focused, don't handle the keypress event
    if (inputFocused) {
      return;
    }

    const key = event.key;

    // Check if key is already being pressed
    if (keysBeingPressed.current.has(key)) {
      return;
    }

    // Add key to the set of keys being pressed
    keysBeingPressed.current.add(key);

    if (key >= '0' && key <= '9') {
      const index = key === '0' ? 9 : parseInt(key, 10) - 1;
      const newCounters = [...counters];
      newCounters[index] = parseInt(newCounters[index], 10) + 1;
      setCounters(newCounters);
      localStorage.setItem(`counter${index + 1}`, newCounters[index]);
    }
  }, [inputFocused, counters, setCounters]);

  const handleKeyUp = useCallback((event) => {
    // Remove key from the set of keys being pressed
    keysBeingPressed.current.delete(event.key);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [counters, handleKeyDown, handleKeyUp]);

  const buttonStyle = inputFocused ? { color: 'primary.main' } : {};

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ maxWidth: '1280px', minWidth: '832px' }}>
        <Box p={3}>
          <Box p={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h4" gutterBottom sx={buttonStyle}>
              Counters
            </Typography>
            <Box p={1} sx={{ display: 'flex', gap: '10px' }}>
              <Button variant="outlined" color="inherit" onClick={() => { handleResetCounters(); handleResetLabels(); }} sx={{ ...buttonStyle, borderRadius: '20px', textTransform: 'none' }}>Reset everything</Button>
              <Button variant="outlined" color="inherit" onClick={handleResetCounters} sx={{ ...buttonStyle, borderRadius: '20px', textTransform: 'none' }}>Reset counters</Button>
              <Button variant="outlined" color="inherit" onClick={handleResetLabels} sx={{ ...buttonStyle, borderRadius: '20px', textTransform: 'none' }}>Reset labels</Button>
            </Box>
          </Box>
          <Box p={1}>
            <Typography variant="subtitle1" gutterBottom sx={buttonStyle}>
              Press a number key to increment the corresponding counter. Note that this website can be opened and used at this URL even when you are offline!
              {inputFocused && <Box p={1}><Typography variant='h6' align='center' sx={{color: '#aa1100', fontWeight: '400'}}>Cannot count while a label field is active; click on the background to start counting!</Typography></Box>}
            </Typography>
          </Box>
          <Grid container spacing={5}>
            {[0, 1].map((_, index) => (
              <Grid item xs={6} key={index}>
                <CountersTable 
                  start={index * 5} 
                  end={(index + 1) * 5} 
                  counters={counters} 
                  labels={labels} 
                  handleChangeLabel={handleChangeLabel} 
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  inputFocused={inputFocused}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;