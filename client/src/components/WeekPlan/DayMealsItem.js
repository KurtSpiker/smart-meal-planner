import React from 'react';
import { Grid } from '@mui/material';
import Show from './Show';
import Load from './Load';
import Add from './Add';
import Confirm from './Confirm';
import useMealsItemMode from '../../hooks/useMealsItemMode';

export default function DayMealsItem(props) {

  const { meal, mealType, dayOfWeek } = props;

  //appointment pannel mode name variables
  const ADD = "ADD";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const LOAD = "LOAD";
  const { mode, transition, back } = useMealsItemMode(ADD);
  
  //If a meal is available transition to the show mode
  if (mode === ADD && meal) {
    transition(SHOW);
  }

  //when a user confirms the remove action
  const onConfirm = () => {
    //call to database and remove recipe from their list
    //set timeout is for demonstration until db is hooked up
    transition(LOAD);
    setTimeout(() => {
      transition(ADD);
    }, 2000);
  };

  //when a user cancels the delete action
  const onRemove = () => {
    transition(CONFIRM)
    return;
  }


  return (
    <Grid container justifyContent="center">

      {mode === SHOW && (
        <Show
          meal={meal}
          mealType={mealType}
          onRemove={() => {
            return transition(CONFIRM)
          }}
          dayOfWeek={dayOfWeek}
        />
      )}
      {mode === ADD && (
        <Add 
          mealType={mealType}
          dayOfWeek={dayOfWeek}
        />)
      }
      {mode === CONFIRM && (
        <Confirm
          onConfirm={onConfirm}
          onCancel={() => back()}
        />)}
      {mode === LOAD && <Load />}

    </Grid>
  );
};