import React from 'react';
import { Grid } from '@mui/material';
import Show from './Show'
import Load from './Load'

export default function DayMealsItem(props) {
  
  const { meal, mealType } = props

  return (
    <Grid container>
      {/* <Show
        meal={meal}
        mealType={mealType}
      />   */}
      <Load />
    </Grid>
  );
};