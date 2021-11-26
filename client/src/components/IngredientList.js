import React from "react";
import { Grid, Typography } from '@mui/material';
import IngredientItem from "./IngredientItem";




const IngredientList = function(props) {

  return (
    <Grid container>
      <Grid container justifyContent="space-between">
        <Grid item xs={2}>
          <Typography>Item</Typography>
        </Grid>
        <Grid item xs={2}>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography>quantity</Typography>
            </Grid>
            <Grid item>
              <Typography>Units</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
      <IngredientItem/>
      <IngredientItem/>
      <IngredientItem/>

    </Grid>
  )
}
export default IngredientList