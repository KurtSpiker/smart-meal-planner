import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useWeeklyPlanData() {

  const [plan, setPlan] = useState({})

  useEffect(() => {
    axios.get(`/api/recipes/mealList/1`)
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