import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

export default function Load() {
  return (
    <Grid >
      <Grid container justifyContent="center">
        <Typography variant="h5">Remove Recipe?</Typography>
      </Grid>
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Button variant="outlined">Confirm</Button>
        </Grid>
        <Grid item>
        <Button variant="outlined">Cancel</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};