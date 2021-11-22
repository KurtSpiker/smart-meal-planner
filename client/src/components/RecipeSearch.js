import { Autocomplete, Grid, Typography, TextField, Card, CardMedia, CardHeader } from "@mui/material";
import React from "react";
import { recipe } from '../sampleRecipe'
import RecipeCarousel from "./RecipeCarousel";
import RecipeSearchItem from "./RecipeSearchItem";


const testRecipies = [
  {
    title: "Ziti",
    image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2020%2F04%2F01%2F4557541.jpg"
  },
  {
    title: "Chicken Ballotine",
    image: "//imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F44%2F2020%2F11%2F09%2Fchk-ballotine-stuffing-1244.jpg&q=85"
  },
  {
    title: "Arancini",
    image: "https://howtofeedaloon.com/wp-content/uploads/2017/08/rice-balls-3-2.jpg"
  },
  {
    title: "Coconut curry",
    image: "http://gazeandgraze.com/wordpress/wp-content/uploads/2017/09/Alinea-5-1024x683.jpg"
  },
  {
    title: "Agnolotti",
    image: "https://www.acanadianfoodie.com/wp-content/uploads/2014/11/2-Agnolotti-del-Plin.jpg"
  }
]


const RecipeSearch = function(props) {
  return (
    <Grid container justifyContent="center">
      <Typography variant="h3">
          Recipies
      </Typography>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.title}
        id="combo-box-demo"
        options={testRecipies}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search for a recipe!" />}
      />
      <Grid container justifyContent="center" spacing={2} >
        { 
          testRecipies.map((recipe) => {
            return <RecipeSearchItem testRecipe={recipe} />
          })
        }

      </Grid>
      <Grid container>
        <RecipeCarousel testRecipies={testRecipies}/>
        <RecipeCarousel testRecipies={testRecipies}/>
      </Grid>
    </Grid>
  )
}

export default RecipeSearch;