import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

export default function Confirm(props) {

  const { onConfirm, onCancel } = props
  return (
    <Grid >
      <Grid container justifyContent="center">
        <Typography variant="h5">Remove Recipe?</Typography>
      </Grid>
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Button variant="outlined" onClick={onConfirm}>Confirm</Button>
        </Grid>
        <Grid item>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};