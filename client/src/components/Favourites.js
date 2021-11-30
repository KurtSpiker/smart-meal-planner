import { Grid, Typography, TextField, CircularProgress, Backdrop } from "@mui/material";
import { React, useState, useEffect } from "react";
import RecipeSearchItem from "./RecipeSearchItem";
import favouritesHeaderIcon from './images/favourites.png'
import useFavouritesRender from "../hooks/useFavoritesRender";
const axios = require('axios');

const Favourites = function (props) {

  const [recipeContent, setRecipeContent] = useState([]);
  const [loading, setLoading] = useState(false)
  const [toggleRender, setToggleRender] = useState(false)
  const { render } = useFavouritesRender()

  useEffect(() => {
    setLoading(true)
    axios.get('/api/search/favourites')
      .then((result) => {
        setRecipeContent(() => {
          console.log("Favortite", result.data)
          return result.data.map((recipe) => {
            return <RecipeSearchItem recipe={recipe} />;
          })
        })
        setLoading(false)
      })
      .catch(
        function (error) {
          console.log(error)
        }
      )
  }, []);


  return (
    <Grid container justifyContent="center">
      {loading && (<Backdrop justifyContent="center"
        open={true}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>)}
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