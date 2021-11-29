import { Grid, Typography, TextField } from "@mui/material";
import { React, useState, useEffect } from "react";
// import RecipeCarousel from "./RecipeCarousel";
import RecipeSearchItem from "./RecipeSearchItem";
const axios = require('axios');


const Favourites = function (props) {


  const [recipeContent, setRecipeContent] = useState([]);

  useEffect(() => {

    axios.get('/api/search/favourites')
      .then((result) => {
        setRecipeContent(() => {
          return result.data.map((recipe) => {
            return <RecipeSearchItem recipe={recipe} />;
          })
        })
      })
      .catch(
        function (error) {
          console.log(error)
        }
      )
  }, []);

  return (
    <Grid container justifyContent="center">
      <Typography variant="h3" sx={{ mr: 1.5 }}>
        Favourites
      </Typography>

      <Grid container justifyContent="center" spacing={2} >
        {
          recipeContent
        }
      </Grid>
    </Grid>
  )
}

export default Favourites;