import React from "react";
import { Grid, Typography } from '@mui/material';
import IngredientItem from "./IngredientItem";

const IngredientList = function (props) {
  const { list, listName, setList } = props;
  const listItems = (listDisplay) => {
    return listDisplay.map((item) => {
      let ingredient = item
      return <IngredientItem key={item.id} ingredient={ingredient} listName={listName} list={list} setList={setList} />
    })
  }

  return (
    <>
      <Grid container mt={6} ml={-10}>
        <Grid item xs={5}>
        </Grid>
        <Grid item xs={4.2} >
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>Item</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>Quantity</Typography>
        </Grid>
        <Grid item xs={0.8}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>Units</Typography>
        </Grid>
      </Grid>

      <Grid container mt={2}>
        {listItems(list)}
      </Grid>
    </>
  )
}
export default IngredientList