import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function RecipeListItem() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper>Hello World</Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper>Hello Mars</Paper>
      </Grid>
    </Grid>
  );
};