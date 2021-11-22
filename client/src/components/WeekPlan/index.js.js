import React from 'react';
import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import { weekRecipes } from '../../sampleWeekRecipes';



export default function WeekMeals() {
  return(
    <Stack>
      <DayMeals meals={weekRecipes.monday} dayOfWeek="Monday"/>
      
    </Stack>
  );
};