import { useState, useEffect, useContext } from 'react'
import { mealContext } from '../providers/MealProvider'
import axios from 'axios';

export default function useWeeklyPlanData() {

  const { weekNumber } = useContext( mealContext )
  const [plan, setPlan] = useState({})

  useEffect(() => {
    axios.get(`/api/recipes/mealList/${weekNumber}`)
      .then((response) => {
        console.log(response.data)
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

  const removeMeal = (meal, day) => {
    return axios.delete(`/api/recipes`, {
      data: {
        week: 1,
        meal,
        day
      }
    })
    .then(() => {
      console.log("remove plan", meal, day)
      let updateObject = {...plan}
      delete updateObject[day][meal];

      setPlan(() => (updateObject));
      
    })
    .catch((e)=>{
      console.log(e);
    });
  }

  return { plan, removeMeal };
};