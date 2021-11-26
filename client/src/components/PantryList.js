import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Autocomplete } from '@mui/material';
import IngredientList from "./IngredientList";
import axios from 'axios'


const PantryList = function (props) {

  const [list, setList] = useState([])
  const [listName, setListName] = useState("")
  const [ingredientSearchItem, setIngredientSearchItem] = useState([])

  useEffect(() => {

    axios.get(`/api/pantry`)
      .then((n) => {
        console.log(n.data.result)
        setListName(n.data.key)
        setList(n.data.result);
      })
      .catch(
        function (error) {
          console.log(error)
        }
      )
  }, []);

  let ingredientSearchResults = [];
  const searchForIngredient = (term) => {
    axios.get(`/api/search/ingredientTerm`, {
      params: {
        searchTerm: term
      }
    })
    .then((result) => {
      //ingredientSearchResults = result.data.results
      setIngredientSearchItem(result.data.results);
    })
  };
  

  return (
    <Grid container>
      <Typography variant="h3">
        Pantry List
      </Typography>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        id="combo-box-demo"
        options={ingredientSearchItem}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField onChange={(event) => searchForIngredient(event.target.value)} {...params} label="Search for an ingredient to add" />}
      />
      <IngredientList list={list} listName={listName} setList={setList} list={list}/>
    </Grid>
  );
}

export default PantryList

