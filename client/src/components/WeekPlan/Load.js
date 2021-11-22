import React from 'react';
import { Grid, CircularProgress } from '@mui/material';

export default function Load() {
  return (
    <Grid 
      container 
      justifyContent="center"
    >
      <CircularProgress />
    </Grid>
  );
}