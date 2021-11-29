import React from 'react';
import { Grid, Button, Typography } from '@mui/material';

export default function Confirm(props) {

  const { onConfirm, onCancel } = props
  return (
    <Grid >
      <Grid container justifyContent="center" mt="32px">
        <Typography variant="h5">Remove Recipe?</Typography>
      </Grid>
      <Grid container justifyContent="space-evenly">
        <Grid item>
          <Button className="confirmDeleteButton" id="confirmAndDeleteButtons" variant="outlined" sx={{ marginRight: "5px" }} onClick={onConfirm}>Confirm</Button>
        </Grid>
        <Grid item>
          <Button className="cancelDeleteButton" id="confirmAndDeleteButtons" variant="outlined" onClick={onCancel}>Cancel</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};