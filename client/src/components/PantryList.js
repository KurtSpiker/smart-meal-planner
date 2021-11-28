import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Autocomplete, Button, Select, MenuItem, Stack } from '@mui/material';
import { AddIngredientButton } from '../customstyles/AddIngredientButton';
import { styled } from '@mui/material/styles';
import pantryListIcon from './images/pantry.png'
import IngredientList from "./IngredientList";
import axios from 'axios'
import useIngredients from "../hooks/useIngredients";
import NumberFormat from 'react-number-format'
import { grey } from '@mui/material/colors';

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
      <Typography variant="h3" className="mainPageHeaders">
        <img className="headerIcon" src={pantryListIcon} />
        Pantry List
      </Typography>
      <Grid container alignItems="center" mt={3}>
        <Grid item xs={3}>
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

        <Grid item xs={8}>
          <Stack direction="row">
            <NumberFormat disabled={!searchTerm.possibleUnits} onChange={(event) => setMeasureValue(event.target.value)} value={measureValue} customInput={TextField} />
            <Select disabled={!searchTerm.possibleUnits} label="Unit of measure" value={dropValue}
              onChange={(event) => {
                setDropValue(event.target.value)
              }}
            >
              {searchTerm.possibleUnits && searchTerm.possibleUnits.map((item) => {
                return <MenuItem key={item} value={item}>{item}</MenuItem>
              })}
            </Select>
            <AddIngredientButton onClick={() => addIngredientItem(listName)} disabled={!dropValue} variant="contained" >Add to pantry</AddIngredientButton>
          </Stack>

        </Grid>
        <IngredientList list={list} listName={listName} setList={setList} />

      </Grid>
    </>
  );
}

export default PantryList

