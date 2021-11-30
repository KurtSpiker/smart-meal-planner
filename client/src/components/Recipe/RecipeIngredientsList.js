import React from 'react'
import { Grid, Stack, Typography} from '@mui/material';
import ListItem from './ListItem'


export default function RecipeList(props) {
  
  const { recipeItems } = props;
  
  return (
    <Grid container>
      <Grid
        sx={{margin:"auto" }} padding="15px"
      >  
        <Typography sx={{borderBottom: "2px solid black"}} variant="h4" >Ingredients</Typography>
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