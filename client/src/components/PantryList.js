import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Autocomplete, Button, Select, MenuItem } from '@mui/material';
import IngredientList from "./IngredientList";
import axios from 'axios'
import useIngredients from "../hooks/useIngredients";
import NumberFormat from 'react-number-format'

const PantryList = function (props) {

  const [list, setList] = useState([]);
  const [listName, setListName] = useState("");

  const { measureValue, setMeasureValue, searchForIngredient, addPantryItem, ingredientSearchResults, active, setActive, searchTerm, dropValue, setDropValue } = useIngredients(list, setList);

  useEffect(() => {

    axios.get(`/api/pantry`)
      .then((n) => {
        //console.log(n.data.result)
        setListName(n.data.key)
        setList(n.data.result);
        console.log("list", list)
      })
      .catch(
        function (error) {
          console.log(error)
        }
      )
  }, [active]);

  return (
    <Grid container>
      <Typography variant="h3">
        Pantry List
      </Typography>
      <Autocomplete
        disablePortal
        getOptionLabel={(option) => option.name}
        onInputChange={(event, inputValue) => {
          searchForIngredient(inputValue)
        }
        }
        id="combo-box-demo"
        options={ingredientSearchResults}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search for an ingredient to add" />}
      />
      <NumberFormat disabled={!searchTerm.possibleUnits} onChange={(event) => setMeasureValue(event.target.value)} value={measureValue}/>
      <Select disabled={!searchTerm.possibleUnits} label="Unit of measure" value={dropValue}
        onChange={(event) => {
          setDropValue(event.target.value)}
        }
      
      >  
        {searchTerm.possibleUnits && searchTerm.possibleUnits.map((item) => {
          return <MenuItem key={item} value={item}>{item}</MenuItem>
        })}
      </Select>
      <Button onClick={() => addPantryItem()} disabled={!dropValue} variant="outlined">Add to pantry</Button>
      <IngredientList list={list} listName={listName} setList={setList} list={list}/>
    </Grid>
  );
}

export default PantryList

