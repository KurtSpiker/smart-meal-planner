import { useEffect, useState } from 'react';
import DayMeals from '../components/WeekPlan/DayMeals';
import axios from 'axios';

export default function useAddRecipe (w) {
  
  useEffect(() => {
    axios.post(`/api/recipes/${spoonacularId}`, {
      week: 1,
      day: "thursday",
      mealName: "delish meal",
      imageUrl: "some-picture.jpg"
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return { handleDayChange };

};