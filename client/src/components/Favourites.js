import { Grid, Typography, TextField } from "@mui/material";
import { React, useState, useEffect } from "react";
import RecipeSearchItem from "./RecipeSearchItem";
import favouritesHeaderIcon from './images/favourites.png'
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
      <header className="mainPageHeaders">
        <img className="headerIcon" src={favouritesHeaderIcon} />
        Favourites
      </header>

      <Grid container justifyContent="center" spacing={2} >
        {
          recipeContent
        }
      </Grid>

    </Grid>
  )
}

export default Favourites;