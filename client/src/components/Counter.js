import React from "react";
import useCounter from '../hooks/useCounter';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';
import NumberFormat from 'react-number-format'

const Counter = function (props) {
  const { quantity, listName, ingredientId } = props

  const { count, setCount, handleDecrement, handleIncrement } = useCounter(quantity, listName, ingredientId);


  return (
    <ButtonGroup aria-label="small outlined button group" >
      <Button onClick={() => handleIncrement()}>+</Button>
      <NumberFormat
        className="quantityField"
        value={count}
        onChange={(event) => setCount(event.target.value)}
        width="70px"
      />
      <Button onClick={() => handleDecrement()}>-</Button>
    </ButtonGroup>
  );

};

export default Counter;