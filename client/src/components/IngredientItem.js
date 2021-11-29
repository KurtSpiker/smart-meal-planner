import React from "react";
import { Grid, Paper, IconButton, Stack } from '@mui/material';
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
    <Grid container paddingBottom="10px">

      <Paper sx={{ p: 2, margin: 'auto', maxWidth: "100%", flexGrow: 1, display: "flex", borderRadius: "15px", border: "2px solid rgb(231, 179, 7)" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Grid item sx={{ width: "200px", border: "4px double #888888", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }} >
              <img alt="ingredient" src={"https://spoonacular.com/cdn/ingredients_500x500/" + ingredient.image_link} style={{ "maxHeight": "70px" }} />
            </Grid>
          </Grid>
          <Grid item xs={4} alignItems="center" sx={{ textTransform: "capitalize", fontSize: "18px" }}>
            {ingredient.item_name}
          </Grid>

          <Grid item xs={4}>
            <Stack direction="row" spacing={2} justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center" textAlign="right">
                <Counter
                  quantity={ingredient.quantity}
                  listName={listName}
                  ingredientId={ingredient.spoonacular_ingredient_id}
                />
                <label className="ingredientMeasure">{ingredient.measure}</label>
              </Stack>
              <IconButton onClick={() => deleteRecipe()}><DeleteIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>

      </Paper >
    </Grid >
  );
};


export default IngredientItem;



// The name of the item
// The image of the object
// Unit of measure
// quantity
