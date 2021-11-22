import React from 'react'
import { Grid, Card, CardHeader } from '@mui/material'
import RecipeList from './RecipeList'
import RecipeInstructions from './RecipeInstructions'
import { recipe } from '../../sampleRecipe'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';


export default function Recipe() {
  
  const recipeItems = recipe.ingredientArray

  return (
    <Grid container justifyContent="center">
      <img src={recipe.image} alt="recipe" width="100%"/>
      <Card sx={{ position: "relative", top: "-150px", width: "95%" }}>
        <Grid container>
          <CardHeader 
            title={recipe.title}
            subheader="Meal Type Prop"
            sx={{textAlign: "center", margin: "auto"}}
          />
          <Grid container justifyContent="space-evenly">
            <Grid item>
              <span>
                <AccessTimeIcon/>
                <p>{recipe.readyInMinutes} minutes</p>
              </span>
            </Grid>
            <Grid item>
              <RestaurantIcon />
              <p>{recipe.servings} servings</p>
            </Grid>
          </Grid>
          <Grid container>
            <RecipeList recipeItems={recipeItems} />
          </Grid>
          <Grid container>
            <RecipeInstructions />
          </Grid>
          
        </Grid>
      </Card>
    </Grid>
  )
};