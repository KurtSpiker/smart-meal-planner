import React from 'react';
import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import { weekRecipes } from '../../sampleWeekRecipes';



export default function WeekPlan() {
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return(
    <Stack>
      {daysOfWeek.map((day) => {
        return (<DayMeals meals={weekRecipes[day] ? weekRecipes[day] : {}} dayOfWeek={day}/>)
      })}
    </Stack>
  );
};