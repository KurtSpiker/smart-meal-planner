import React, { useState, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from "axios";


const Counter = function (props) {
  const { quantity, listName, ingredientId } = props
  const [count, setCount] = useState(quantity)

  useEffect(() => {
    axios.post(`/api/${listName}/edit/${ingredientId}`, {
      data: {
        quantity: quantity
      }
    })
  }, [count])


  // })
  // })

  //  http://localhost:4000/api/pantry/edit/12345
  //  http://localhost:4000/api/grocery_list/edit/12345


  const handleIncrement = () => {
    setCount((prev) => {
      return prev += 1;
    });
  };

  const handleDecrement = () => {
    setCount((prev) => {
      if (prev === 0) {
        return prev = 0;
      }
      return prev -= 1;
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
    // <p>{count}</p>
  );

};

export default Counter;