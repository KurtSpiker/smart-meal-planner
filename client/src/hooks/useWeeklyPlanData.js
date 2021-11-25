import { useState, useEffect, useContext } from 'react'
import { mealContext } from '../providers/MealProvider'
import axios from 'axios';

export default function useWeeklyPlanData() {

  const { weekNumber } = useContext( mealContext )
  const [plan, setPlan] = useState({})

  useEffect(() => {


  }, [plan]);

  useEffect(() => {
    axios.get(`/api/recipes/mealList/${weekNumber}`)
    .then((data)=>{
      setPlan(data)
    })
 
  }, [])

  useEffect(() => {
    axios.get(`/api/recipes/mealList/${weekNumber}`)
    .then(()=>{
      setPlan((prev)=>{
       let obj = { ...prev}
       delete obj[1].monday.breakfast;
       return obj;
      })
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
      ))
      .then(()=>{
        console.log("GOT TO UPDATE MEALIST!")
        axios.get(`/api/recipes/mealList/${weekNumber}`)
        .then((response) => {
          setPlan((prev) => (
            {
              ...prev, 
              ...response.data
            }
          ))
        })
      })
    })
    .catch((e)=>{
      console.log(e);
    });
  }

  return { plan, removeMeal };
};