import React, { Component } from "react";
import Apple from './Apple.png'
import { Grid, Typography, Paper, IconButton, ButtonBase} from '@mui/material';
import Counter from './Counter';
import DeleteIcon from '@mui/icons-material/Delete';

const GroceryListItem = function(props) {

  return (
    <Grid container padding="10px">
      <Paper sx={{ p: 2, margin: 'auto', maxWidth: "100%", flexGrow: 1, display: "flex"}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: 64, height: 64 }}>
              <img alt="Apple" src={Apple} width="120%"/>
            </ButtonBase>
          </Grid>
          <Grid item>
            Apple
          </Grid>
        </Grid> 
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
              <Counter/>
              Unit
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

 
export default GroceryListItem;



// The name of the item
// The image of the object
// Unit of measure
// quantity
