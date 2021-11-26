import { useState } from 'react'

export default function useMealsItemMode(modeInit) {
  
  const [mode, setMode] = useState(modeInit);
  const [history, setHistory] = useState([modeInit])
  let updatedHistory = [...history];

  const transition = (modeInit, replace = false) => {
    if(replace) {
      updatedHistory.splice(-1, 1, modeInit);
    } 
    
    if (!replace) {
      //this is pushing an array into the array. fix this bug
      updatedHistory.push(modeInit);
    }
    
    setHistory(updatedHistory);
    return setMode(updatedHistory.slice(-1)[0]);
  };

  //this function gets called to traverse backward in the application mode pannels
  const back = () => {
    console.log(updatedHistory)
    if (updatedHistory.length > 1) {
      updatedHistory.pop();
      console.log(updatedHistory)
      setHistory(updatedHistory);
      return setMode(updatedHistory.slice(-1)[0]);
    }
  };

  return { mode, transition, back };

};
