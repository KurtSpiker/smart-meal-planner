import { useState, useEffect, useContext } from 'react'
import { mealContext } from '../providers/MealProvider'
import axios from 'axios';

export default function useWeeklyPlanData() {

  const { weekNumber } = useContext( mealContext )
  const [plan, setPlan] = useState({})

  useEffect(() => {
    axios.get(`/api/recipes/mealList/${weekNumber}`)
      .then((response) => {
        setPlan((prev) => (
          {
            ...prev, 
            ...response.data
          }
        ))
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, [plan]);

  const removeMeal = (meal, day) => {
    console.log("Remove this meal!")
    return axios.delete(`/api/recipes`, {
      data: {
        week: 1,
        meal,
        day
      }
    })
    .then(() => {
      console.log("do i get here?")
      setPlan((prev) => (
        {
          ...prev,
          [day]: {[meal]: {}}
        }
      ));
      console.log(plan)
    })
    .catch((e)=>{
      console.log(e);
    });
  }

  return { plan, removeMeal };
};