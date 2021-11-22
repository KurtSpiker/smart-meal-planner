import React from 'react'
import Grid from '@mui/material/Grid';

export default function RecipeListItem(props) {

  const { listItem } = props;

  return (
    <Grid container>
      <Grid>
        <li>{listItem}</li>
      </Grid>
    </Grid>
  );
};