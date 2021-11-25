import { useEffect, useState, useContext } from 'react';
import DayMeals from '../components/WeekPlan/DayMeals';
import { mealContext } from '../providers/MealProvider';
import axios from 'axios';

export default function useRecipe () {

  const [recipe, setRecipe] = useState(
    {
      "recipeId": "",
      "dieteryRestrictions": {},
      "ingredientArray": [],
      "title": "",
      "time": null,
      "servings": null,
      "sourceUrl": "",
      "image": "",
      "summary": "",
      "instructions": []
    });
  
  const { mealId } = useContext(mealContext);
  
  useEffect(() => {
    axios.get(`/api/recipes/${mealId}`)
    .then((response)=>{
      setRecipe ((prev) => (
        {
          ...prev, 
          ...response.data
        }
      ));
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return { recipe };

};