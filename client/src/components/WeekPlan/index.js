import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import { weekRecipes } from '../../sampleWeekRecipes';
import useWeeklyPlanData from '../../hooks/useWeeklyPlanData';

export default function WeekPlan() {

  const { plan } = useWeeklyPlanData();

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <Stack>
      {daysOfWeek.map((day) => {
        return (
          <DayMeals
            key={day}
            meals={plan[day] ? plan[day] : {}} 
            dayOfWeek={day}
          />
        )
      })}
    </Stack>
  );
};