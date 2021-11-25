import React from 'react'
import { Grid, Card, CardHeader, Backdrop, CircularProgress } from '@mui/material'
import RecipeIngredientsList from './RecipeIngredientsList'
import InstructionsList from './InstructionsList'
// import { recipe } from '../../sampleRecipe'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import useRecipe from '../../hooks/useRecipe'


export default function Recipe() {
  
  const { recipe, loading } = useRecipe();
  const recipeItems = recipe.ingredientArray
  const instructionItems = recipe.instructions


  return (
    <div>
      {loading && (<Backdrop
        open={true}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>)}
      {!loading && (<Grid container justifyContent="center">
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
                  <p>{recipe.time} minutes</p>
                </span>
              </Grid>
              <Grid item>
                <RestaurantIcon />
                <p>{recipe.servings} servings</p>
              </Grid>
            </Grid>
            <Grid container>
              <RecipeIngredientsList recipeItems={recipeItems} />
            </Grid>
            <Grid container>
              <InstructionsList instructionItems={instructionItems}/>
            </Grid>
            
          </Grid>
        </Card>
      </Grid>)}
    </div>
  )
};