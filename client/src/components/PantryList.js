import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, Button, Grid, Typography, TextField, Autocomplete, Select, MenuItem, Stack } from '@mui/material';
import { AddIngredientButton } from '../customstyles/AddIngredientButton';
import pantryListIcon from './images/pantry.png'
import IngredientList from "./IngredientList";
import axios from 'axios'
import useIngredients from "../hooks/useIngredients";
import NumberFormat from 'react-number-format'

const PantryList = function (props) {

  const [list, setList] = useState([]);
  const [listName, setListName] = useState("");

  const {
    measureValue,
    setMeasureValue,
    searchForIngredient,
    addIngredientItem,
    ingredientSearchResults,
    active,
    setActive,
    searchTerm,
    dropValue,
    setDropValue
  } = useIngredients(list, setList);

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
    <>
      <header className="mainPageHeaders">
        <img className="headerIcon" src={pantryListIcon} />
        Pantry List
      </header>
      <Grid container alignItems="center" mt={3}>
        <Grid item xs={2.5}>
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
        </Grid>

        <Grid item xs={8.5}>
          <Stack direction="row">
            <NumberFormat disabled={!searchTerm.possibleUnits} onChange={(event) => setMeasureValue(event.target.value)} value={measureValue} customInput={TextField} />

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="Measure">Unit</InputLabel>
              <Select disabled={!searchTerm.possibleUnits} labelId="Measure" label="Unit" value={dropValue}
                onChange={(event) => {
                  setDropValue(event.target.value)
                }}
              >
                {searchTerm.possibleUnits && searchTerm.possibleUnits.map((item) => {
                  return <MenuItem key={item} value={item}>{item}</MenuItem>
                })}
              </Select>
            </FormControl>

            <AddIngredientButton onClick={() => addIngredientItem(listName)} disabled={!dropValue} variant="contained" >Add to pantry</AddIngredientButton>
          </Stack>

        </Grid>
        <IngredientList list={list} listName={listName} setList={setList} />

      </Grid>
    </>
  );
}

export default PantryList

