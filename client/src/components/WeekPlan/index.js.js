import React from 'react';
import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import { weekMeals } from '../../sampleWeekRecipes';



export default function WeekMeals() {
  return(
    <Stack>
      <DayMeals day="monday"/>
      <DayMeals day="tuesday" />
      <DayMeals day="wednesday"/>
      <DayMeals day="thursday"/>
      <DayMeals day="friday"/>
      <DayMeals day="saturday"/>
      <DayMeals day="sunday"/>
    </Stack>
  );
};