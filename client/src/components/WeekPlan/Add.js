import React, { useContext } from 'react';
import { ButtonBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { mealContext } from '../../providers/MealProvider';

export default function Load(props) {
  
  const { mealType, dayOfWeek } = props

  const { setDayInformation } = useContext(mealContext);

  return (
    
    <ButtonBase onClick={() => setDayInformation(dayOfWeek, mealType)} component={Link} to={"/Recipe_search"}>
      <AddIcon />
    </ButtonBase>
    
  );
};