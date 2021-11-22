import React from 'react';
import { Grid, Button } from '@mui/material';

export default function Load() {
  return (
    <Grid >
      <Grid container>
        Remove Recipe?
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