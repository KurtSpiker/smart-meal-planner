import React from 'react'
import { Grid, Paper, Card, CardMedia, CardHeader } from '@mui/material'
import RecipeList from './RecipeList'
import { recipe } from '../../sampleRecipe'
import { AccessTimeIcon, RestaurantIcon }  from '@mui/icons-material';



export default function Recipe() {

  const recipeItems = recipe.extendedIngredients

  let sample =[]
  recipeItems.map((item) => {
    return sample.push(item.name);
  });

  return (
    <Grid container justifyContent="center">
      <img src={recipe.image} alt="recipe" width="100%"/>
      <Card sx={{ position: "relative", top: "-150px", width: "95%" }}>
        <Grid container>
          <CardHeader 
            title={recipe.title}
            subheader="Breakfast, Lunch, Dinner"
            sx={{textAlign: "center"}}
          />
          <Grid container>
            <Grid item>
              <RestaurantIcon />
            </Grid>
            <Grid item>
              <AccesTimeIcon />
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
};