import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import DayMeals from './DayMeals';
import { weekRecipes } from '../../sampleWeekRecipes';
import axios from 'axios';

export default function WeekPlan(props) {

  const { setSelectedMeal } = props

  useEffect(() => {
    axios.get(`/api/recipes/mealList/1`)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, []);

  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  return (
    <Stack>
      {daysOfWeek.map((day) => {
        return (
          <DayMeals
            key={day}
            meals={weekRecipes[day] ? weekRecipes[day] : {}} dayOfWeek={day}
            setSelectedMeal={setSelectedMeal}

          />
        )
      })}
    </Stack>
  );
};