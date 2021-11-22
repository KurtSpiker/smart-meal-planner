import React from 'react'
import { Grid, Stack } from '@mui/material';
import RecipeListItem from './RecipeListItem'


export default function RecipeList(props) {
  
  const { recipeItems } = props;

  // const ingredients = recipeItems.map((item) => {
  //   let ingredient = item.original;
  //   return <RecipeListItem ingredientItem={ingredient} />;
  // });
  
  
  return (
    <Grid container>
      <Grid
        sx={{margin:"auto"}}
      >
        <div class="ingredient-list"><h2>Ingredients</h2></div>
      </Grid>
      <Grid container>
        <Stack
          direction="column"
          spacing={1}
          sx={{width:"90%", margin:"auto"}}
        >
          {
            recipeItems.map((item) => {
                let ingredient = item.original;
                return <RecipeListItem ingredientItem={ingredient} />;
              })
          }
        </Stack>
      </Grid>
    </Grid>
  );
};