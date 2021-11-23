import React, { useState } from 'react'


export default function useMealsItemMode(modeInit) {
  
  const [mode, setMode] = useState(modeInit);
  const [history, setHistory] = useState(modeInit)
  let updatedHistory = [...history];

  const transition = (modeInit, replace = false) => {
    if(replace) {
      updatedHistory.splice(-1, 1, modeInit);
    } 
    
    if (!replace) {
      updatedHistory.push(modeInit);
    }
    
    setHistory(updatedHistory);
    return setMode(updatedHistory.slice(-1)[0]);
  };

  //this function gets called to traverse backward in the application mode pannels
  const back = () => {
    
    if (updatedHistory.length > 1) {
      updatedHistory.pop();
      setHistory(updatedHistory);
      return setMode(updatedHistory.slice(-1)[0]);
    }
  };

  return { mode, transition, back };

};
