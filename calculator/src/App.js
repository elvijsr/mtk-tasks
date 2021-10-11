import React from 'react'
import Box from '@mui/material/Box'
import Calculator from './components/Calculator'

const App = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="100vh"
  >
    <Calculator />
  </Box>
)

export default App
