import { useState, useEffect, useContext } from 'react'
import { mealContext } from '../providers/MealProvider'
import axios from 'axios';

export default function useWeeklyPlanData() {

  const { weekNumber } = useContext( mealContext )
  const [plan, setPlan] = useState({})

  useEffect(() => {
    axios.get(`/api/recipes/mealList/${weekNumber}`)
      .then((response) => {
        console.log(response)
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
  }, []);

  return { plan };
};