import React from 'react'
import { Grid, Stack } from '@mui/material';
import ListItem from './ListItem'


export default function RecipeList(props) {
  
  const { recipeItems } = props;
  
  return (
    <Grid container>
      <Grid
        sx={{margin:"auto", padding:"20px"}}
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
                let ingredient = item;
                return <ListItem listItem={ingredient} />;
              })
          }
        </Stack>
      </Grid>
    </Grid>
  );
};