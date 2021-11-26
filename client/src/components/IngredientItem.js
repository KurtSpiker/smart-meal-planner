import React from "react";
import Apple from './Apple.png'
import { Grid, Paper, IconButton, ButtonBase } from '@mui/material';
import Counter from './Counter';
import DeleteIcon from '@mui/icons-material/Delete';

const IngredientItem = function (props) {
  const { ingredient, listName } = props;

  return (
    <Grid container padding="10px">
      <Paper sx={{ p: 2, margin: 'auto', maxWidth: "100%", flexGrow: 1, display: "flex" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: "200px" }}>
              <img alt="ingredient-image" src={"https://spoonacular.com/cdn/ingredients_500x500/" + ingredient.image_link} style={{ "maxHeight": "70px" }} />
            </ButtonBase>
          </Grid>
          <Grid item alignItems="center">
            {ingredient.item_name}
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Counter quantity={ingredient.quantity} listName={listName} ingredientId={ingredient.id}/>
            {ingredient.measure}
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};


export default IngredientItem;



// The name of the item
// The image of the object
// Unit of measure
// quantity
