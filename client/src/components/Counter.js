import React, {useState} from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from '@mui/material/Button';


const Counter = function(props) {
  const [count, setCount] = useState(0)

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
      <Button disabled>{count}</Button>
      <Button onClick={() => handleDecrement()}>-</Button>
    </ButtonGroup>
    // <p>{count}</p>
  );
  
};

export default Counter;