import { Grid, Typography, TextField } from "@mui/material";
import { React, useState, useEffect } from "react";
// import RecipeCarousel from "./RecipeCarousel";
import RecipeSearchItem from "./RecipeSearchItem";
import RecipeCarousel from "./RecipeCarousel";
const axios = require('axios');

const testRecipies = {
  "results": [
    {
        "id": 661531,
        "title": "Steak with lemon and capers",
        "image": "https://spoonacular.com/recipeImages/661531-312x231.jpg",
        "imageType": "jpg",
        "dieteryRestrictions": {
            "vegan": false,
            "glutenFree": false,
            "dairyFree": false,
            "vegetarian": false
        },
        "favourite": false
    },
    {
        "id": 1096025,
        "title": "Steak Salad with Chimichurri Sauce",
        "image": "https://spoonacular.com/recipeImages/1096025-312x231.jpg",
        "imageType": "jpg",
        "dieteryRestrictions": {
            "vegan": false,
            "glutenFree": true,
            "dairyFree": true,
            "vegetarian": false
        },
        "favourite": false
    },
    {
        "id": 661522,
        "title": "Steak With Blue Cheese Sherry Sauce",
        "image": "https://spoonacular.com/recipeImages/661522-312x231.jpg",
        "imageType": "jpg",
        "dieteryRestrictions": {
            "vegan": false,
            "glutenFree": true,
            "dairyFree": false,
            "vegetarian": false
        },
        "favourite": false
    },
    {
        "id": 661510,
        "title": "Steak Salad With Roasted Potatoes and Fennel",
        "image": "https://spoonacular.com/recipeImages/661510-312x231.jpg",
        "imageType": "jpg",
        "dieteryRestrictions": {
            "vegan": false,
            "glutenFree": true,
            "dairyFree": true,
            "vegetarian": false
        },
        "favourite": false
    },
    {
        "id": 661500,
        "title": "Steak And Pepper Rounds With Rose Horseradish Garlic Creme Sauce",
        "image": "https://spoonacular.com/recipeImages/661500-312x231.jpg",
        "imageType": "jpg",
        "dieteryRestrictions": {
            "vegan": false,
            "glutenFree": false,
            "dairyFree": false,
            "vegetarian": false
        },
        "favourite": false
    }
  ]
};

const RecipeSearch = function (props) {

  const [recipes, setRecipes] = useState([]);
  const [searchTextValue, setSearchTextValue] = useState("");
  const [recipeContent, setRecipeContent] = useState([]);

  useEffect(() => {

    axios.get('/api/recipes', {
      params: {
        search: searchTextValue
      }
    })
      .then((result) => {
        setRecipes(() => {
          return result.data;
        })
        setRecipeContent(() => {
          return recipes.map((recipe) => {
            return <RecipeSearchItem recipe={recipe} />;
          })
        })
      })
      .catch(
        function (error) {
          console.log(error)
        }
      )
  }, [searchTextValue]);

  return (
    <Grid container justifyContent="center">
      <Typography variant="h3" sx={{ mr: 1.5 }}>
        Search Recipes
      </Typography>
      <TextField onChange={(event) => { setSearchTextValue(event.target.value) }}></TextField>
      <Grid container justifyContent="center" spacing={2} >
        {
          recipeContent
        }
        <RecipeSearchItem recipe={testRecipies.results[0]} test={true} />
      </Grid>
      <Grid container>
        <RecipeCarousel testRecipies={testRecipies.results}/>
      </Grid>
    </Grid>
  )
}

export default RecipeSearch;