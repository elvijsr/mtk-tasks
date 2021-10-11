import React from 'react'
import Button from '@mui/material/Button'

const CalcButton = ({
  text, dark, wide, onClick,
}) => {
  const attrs = dark ? { backgroundColor: '#bfd9f2', color: '#4287db' } : { backgroundColor: '#ebeff2', color: '#878a8c' }
  const width = wide ? { gridColumn: '1/3' } : {}

  return (
    <Button
      disableElevation
      sx={{
        fontSize: 15,
        height: '60px',
        width,
        ...attrs,
        ':hover': { backgroundColor: '#b5babd' },
      }}
      variant="contained"
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default CalcButton
