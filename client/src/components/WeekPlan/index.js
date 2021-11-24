import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import { weekRecipes } from '../../sampleWeekRecipes';
import useWeeklyPlanData from '../../hooks/useWeeklyPlanData';

export default function WeekPlan(props) {

  const { setSelectedMeal } = props

  const { plan } = useWeeklyPlanData();
  console.log("plan", plan)

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <Stack>
      {daysOfWeek.map((day) => {
        return (
          <DayMeals
            key={day}
            meals={plan[day] ? plan[day] : {}} 
            dayOfWeek={day}
            setSelectedMeal={setSelectedMeal}
          />
        )
      })}
    </Stack>
  );
};