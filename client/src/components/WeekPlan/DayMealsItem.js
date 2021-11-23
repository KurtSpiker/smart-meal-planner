import React from 'react';
import { Grid } from '@mui/material';
import Show from './Show'
import Load from './Load'
import Add from './Add'
import Confirm from './Confirm'
import useMealsItemMode from '../../hooks/useMealsItemMode'

export default function DayMealsItem(props) {
  
  const { meal, mealType } = props

  //appointment pannel mode name variables
  const ADD = "ADD"
  const SHOW = "SHOW";

  const { mode, transition, back } = useMealsItemMode(meal ? SHOW : ADD)

  return (
    <Grid container justifyContent="center">
      {mode === SHOW && (
        <Show
      meal={meal}
      mealType={mealType}
      />
      )}
      {mode === ADD && (
        <Add />
      )}
    </Grid>
  );
};