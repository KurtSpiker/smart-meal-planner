import React from 'react'
import { Grid, Stack, Typography } from '@mui/material';
import ListItem from './ListItem'

export default function RecipeInstructions(props) {

  const { instructionItems } = props;

  return (
    <Grid container>
      <Grid sx={{margin:"auto"}} padding="15px">
        <Typography sx={{borderBottom: "2px solid black"}} variant="h4" >Instructions</Typography>
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

