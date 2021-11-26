import { useState, useEffect } from "react";
import axios from "axios";

export default function useCounter(quantity, listName, ingredientId) {
  
  const [count, setCount] = useState(quantity)
  
  useEffect (() => {
    
    axios.post(`/api/${listName}/edit/${ingredientId}`, 
      {   
        spoonacularId: ingredientId,
        quantity: count  
      })
      .catch((err) => {
        console.log(err.message)
      });
    
  }, [count])

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
  return { count, handleDecrement, handleIncrement, setCount };
};