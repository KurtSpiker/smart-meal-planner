import { useState, useEffect, useContext } from 'react'
import { mealContext } from '../providers/MealProvider'
import axios from 'axios';

export default function useWeeklyPlanData() {

  const { weekNumber } = useContext( mealContext )
  const [plan, setPlan] = useState({})

  useEffect(() => {
    
  }, [plan]);

  const removeMeal = removeMeal.then(data => 
    const temPdata = plan;
    
    setPlan(
      ...tempData,
      [day]: {[edata]: {}})
    
  }

  removeMeal()
  .then(()=>{
    weeklyPlanUpdate()
  })

  return { plan, removeMeal };
};





function removeMeal(meal, day, setPlan) {
  return axios.delete(`/api/recipes`, {
    data: {
      week: 1,
      meal,
      day
    }
  })
  .then(() => {
    console.log("do i get here?")
    setPlan(pass the data);
  } 
  .catch((e)=>{
  console.log(e);
});
}
function weeklyPlanUpdate {
  return axios.get(`/api/recipes/mealList/${weekNumber}`) {
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
}