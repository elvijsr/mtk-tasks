/* eslint-disable no-eval */
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import CalcButton from './CalcButton'

const Calculator = () => {
  const [result, setResult] = useState(0)
  const [expression, setExpression] = useState('')

  const buttons = [
    { text: 'C', dark: true },
    { text: '%', dark: true },
    { text: '+/-', dark: true },
    { text: '/', dark: true },
    { text: '7' },
    { text: '8' },
    { text: '9' },
    { text: '*', dark: true },
    { text: '4' },
    { text: '5' },
    { text: '6' },
    { text: '-', dark: true },
    { text: '1' },
    { text: '2' },
    { text: '3' },
    { text: '+', dark: true },
    { text: '0', wide: true },
    { text: '.' },
    { text: '=', dark: true },
  ]

  const handleInputChange = (event) => {
    const newExp = event
      // replace all non-numbers and non-operators with empty string
      .replace(
        /([^0-9-+/*.])/g, '',
      )
      // For everything past the first decimal, replace decimals with the empty string
      .replace(
        /(\d*\.)([\d.]+)/g, (_, g1, g2) => g1 + g2.replace(/\./g, ''),
      )
      // if 2 or more operators replace with last one captured
      .replace(
        /([-+/*]){2,}/g, '$1',
      )
    setExpression(newExp)
  }

  const handleClick = (symbol) => {
    switch (symbol) {
    case '=': {
      // regex to check if correct mathematical expression
      const re = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/
      if (re.test(expression)) setResult(parseFloat(eval(expression).toPrecision(14)))
      break
    }

    case 'C': {
      setExpression('')
      setResult(0)
      break
    }

    case '+/-': {
      if (expression[0] === '-') setExpression(expression.substring(1))
      else setExpression(`-${expression}`)
      break
    }

    case '%': {
      // split by last operation and calculate result of first part
      const divided = expression.split(/(-|\+|\/|\*)(?=[^\-+/*]*$)/g)
      const initialCalc = eval(divided[0])

      // work out percentage operation value based on operation
      let percentageValue = ''
      if (divided[1] === '+' || divided[1] === '-') percentageValue = (initialCalc / 100) * divided[2]
      else percentageValue = divided[2] / 100

      // stitch expression back together and calculate result
      const calcResult = eval(initialCalc + divided[1] + percentageValue)
      if (calcResult) setResult(calcResult)
      else setResult(0)
      break
    }

    default:
      handleInputChange(expression + symbol)
    }
  }

  return (
    <Box
      sx={{
        bgcolor: 'white',
        boxShadow: 3,
        borderRadius: 2,
        p: 3,
        width: '300px',
      }}
    >
      <Box
        sx={{
          color: 'primary.main',
          fontWeight: 500,
          fontSize: 30,
          opacity: '80%',
          overflowWrap: 'break-word',
        }}
        maxLength="12"
      >
        {result}
      </Box>

      <Box
        sx={{ fontSize: 20, fontWeight: 'medium', opacity: '50%' }}
        my="20px"
      >
        <TextField
          value={expression}
          onChange={(event) => handleInputChange(event.target.value)}
          fullWidth
          focused
          variant="standard"
          color="grey"
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
        {buttons.map((info) => (
          <CalcButton
            key={info.text}
            text={info.text}
            dark={info.dark}
            wide={info.wide}
            onClick={() => handleClick(info.text)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Calculator
