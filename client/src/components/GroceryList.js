import React from "react";
import { Grid, Typography } from '@mui/material';
import IngredientList from "./IngredientList";
import { useState, useEffect } from "react";
import axios from "axios";


const GroceryList = function (props) {

  const [list, setList] = useState([]);
  const [listName, setListName] = useState("")

  useEffect(() => {

    axios.get(`/api/grocery_list/1`)
      .then((n) => {
        console.log("grocery list", n.data.result);
        setList(n.data.result);
        setListName(n.data.key)
      })
      .catch(
        function (error) {
          console.log(error)
        }
      )
  }, []);

  return (
    <Grid container>
      <Typography variant="h3">
        GroceryList
      </Typography>
      <IngredientList list={list} listName={listName} />
    </Grid>
  )
}
export default GroceryList