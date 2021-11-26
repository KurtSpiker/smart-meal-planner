import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Autocomplete } from '@mui/material';
import IngredientList from "./IngredientList";
import axios from 'axios'


const PantryList = function (props) {

  const [list, setList] = useState([])
  const [listName, setListName] = useState("")

  useEffect(() => {

    axios.get(`/api/pantry`)
      .then((n) => {
        console.log(n.data.result)
        setList(n.data.result);
        setListName(n.data.key)
        console.log("pantry list", list)
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
        Pantry List
      </Typography>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        id="combo-box-demo"
        options={[]}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search for an ingredient to add" />}
      />
      <IngredientList list={list} listName={listName} />
    </Grid>
  );
}

export default PantryList

