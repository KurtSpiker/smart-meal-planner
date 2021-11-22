import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function RecipeListItem(props) {

  const { ingredientItem } = props;

  return (
    <Grid container>
      <Grid>
        <li>{ingredientItem}</li>
      </Grid>
    </Grid>
  );
};