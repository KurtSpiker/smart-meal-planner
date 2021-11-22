import React from 'react';
import { Grid } from '@mui/material';
import Show from './Show'
import Load from './Load'
import Add from './Add'
import Confirm from './Confirm'

export default function DayMealsItem(props) {
  
  const { meal, mealType } = props

  return (
    <Grid container justifyContent="center">
      {
      meal? (
      <Show
        meal={meal}
        mealType={mealType}
      />):(<Add/>)
      }  
    </Grid>
  );
};