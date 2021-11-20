import React, { Component } from "react";
import { Grid, Typography, TextField, Autocomplete} from '@mui/material';
import IngredientList from "./IngredientList";

const demoIngredients = [
  {
    name: "apples"
  },
  {
   name: "oranges" 
  },
  {
    name: "chicken breast"
  },
  {
    name: "cherry tomatoes"
  }
];

const PantryList = function(props) {
  return (
    <Grid container>
      <Typography variant="h3">
          Pantry List
        </Typography>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        id="combo-box-demo"
        options={demoIngredients}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search for an ingredient to add" />}
      />
      <IngredientList />
    </Grid>
  );
}

export default PantryList

