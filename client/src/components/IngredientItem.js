import React from "react";
import { Grid, Paper, IconButton, ButtonBase } from '@mui/material';
import Counter from './Counter';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const IngredientItem = function (props) {
  const { ingredient, listName, setList, list } = props;

  const deleteRecipe = () => {
    axios.delete(`/api/${listName}/delete/${ingredient.spoonacular_ingredient_id}`,
      {
        spoonacularId: ingredient.spoonacular_ingredient_id, week: 1
      })
      .then(() => {
        list.forEach((item, index) => {
          if (item.spoonacular_ingredient_id === ingredient.spoonacular_ingredient_id) {
            let listReplace = [...list]
            listReplace.splice(index, 1)
            setList(listReplace)
            return
          }
        })
      })
      .catch((err) => {
        console.log(err.message)
      });
  }


  return (
    <Grid container padding="10px">
      <Paper sx={{ p: 2, margin: 'auto', maxWidth: "100%", flexGrow: 1, display: "flex" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: "200px" }}>
              <img alt="ingredient" src={"https://spoonacular.com/cdn/ingredients_500x500/" + ingredient.image_link} style={{ "maxHeight": "70px" }} />
            </ButtonBase>
          </Grid>
          <Grid item alignItems="center">
            {ingredient.item_name}
          </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="flex-end">
          <Grid item>
            <Counter
              quantity={ingredient.quantity}
              listName={listName}
              ingredientId={ingredient.spoonacular_ingredient_id}
            />
            <label className="ingredientMeasure">{ingredient.measure}</label>
            <IconButton onClick={() => deleteRecipe()}>
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
