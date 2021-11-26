import React, { useState, useEffect } from "react";
import useCounter from '../hooks/useCounter';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';
import axios from "axios";


const Counter = function (props) {
  const { quantity, listName, ingredientId } = props
  const { count, handleDecrement, handleIncrement } = useCounter(quantity, listName, ingredientId);

  return (
    <ButtonGroup aria-label="small outlined button group" >
      <Button onClick={() => handleIncrement()}>+</Button>
      <Button>
        {count}
      </Button>
      <Button onClick={() => handleDecrement()}>-</Button>
    </ButtonGroup>
  );

};

export default Counter;