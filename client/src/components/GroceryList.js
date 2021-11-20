import React, { Component } from "react";
import Apple from './Apple.png'
import { Grid, Typography, Paper} from '@mui/material';
import ButtonBase from '@mui/material/ButtonBase';
import GroceryListItem from "./GroceryListItem";


const GroceryList = function(props) {

  

  return (
    <Grid container>
      <Typography variant="h3">
        GroceryList
      </Typography>
      <Grid container justifyContent="space-between">
        <Grid item xs={2} allignItems="center">
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
      
      <GroceryListItem/>
      <GroceryListItem/>
      <GroceryListItem/>

    </Grid>
  )
}
export default GroceryList