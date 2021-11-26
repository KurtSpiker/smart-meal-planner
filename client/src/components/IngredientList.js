import React from "react";
import { Grid, Typography } from '@mui/material';
import IngredientItem from "./IngredientItem";

const IngredientList = function (props) {
  const { list, listName} = props;
  const listItems = (list) => {
   return list.map((item) => {
      let ingredient = item
      return <IngredientItem ingredient={ingredient} listName={listName}/>
    })
  }

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

      {listItems(list)}

    </Grid>
  )
}
export default IngredientList