import { useEffect, useState, useContext } from 'react';
import { mealContext } from '../providers/MealProvider';
import axios from 'axios';

export default function useRecipe () {

  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    axios.get(`/api/recipes/${mealId}`)
    .then((response)=>{
      setRecipe ((prev) => (
        {
          ...prev, 
          ...response.data
        }
      ));
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])

  return { recipe, loading };

};