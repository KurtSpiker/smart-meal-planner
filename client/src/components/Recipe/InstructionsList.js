import React from 'react'
import { Grid, Stack } from '@mui/material';
import ListItem from './ListItem'

export default function RecipeInstructions(props) {

  const { instructionItems } = props;

  return (
    <Grid container>
      <Grid sx={{margin:"auto"}}>
        <div class="ingredient-list"><h2>Instructions</h2></div>
      </Grid>
      <Grid container>
        <Stack
          direction="column"
          spacing={1}
          sx={{width:"90%", margin:"auto"}}
        >
          {
            instructionItems.map((item) => {
                let instruction = item;
                return <ListItem listItem={instruction} />;
              })
          }
        </Stack>
      </Grid>
    </Grid>
  );
};

