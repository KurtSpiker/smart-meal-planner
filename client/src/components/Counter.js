import React, { useState, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';
import axios from "axios";


const Counter = function (props) {
  const { quantity, listName, ingredientId } = props
  const [count, setCount] = useState(quantity)
  console.log(quantity)
  
  const updateQuantity = () => {
   return axios.post(`/api/${listName}/edit/${ingredientId}`, {
      data: {
        spoonacularId: ingredientId,
        quantity: quantity
      }
    })
    .catch((err) => {
      console.log(err.message)
    });
  };

  const handleIncrement = () => {
    updateQuantity()
      .then(() => {
        setCount((prev) => {
          return prev += 1;
        });
      });
  };

  const handleDecrement = () => {
    updateQuantity()
      .then(() => {
        setCount((prev) => {
          if (prev === 0) {
            return prev = 0;
          }
          return prev -= 1;
        });
      });
  };

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