import React from "react";
import { Grid, Typography} from '@mui/material';
import IngredientList from "./IngredientList";


const GroceryList = function(props) {

  

  return (
    <Grid container>
      <Typography variant="h3">
        GroceryList
      </Typography>
      <IngredientList />
    </Grid>
  )
}
export default GroceryList