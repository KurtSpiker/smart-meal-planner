import { Grid, Typography, TextField, Autocomplete, Button, Select, MenuItem } from '@mui/material';
import IngredientList from "./IngredientList";
import { useState, useEffect } from "react";
import axios from "axios";
import useIngredients from "../hooks/useIngredients";
import NumberFormat from 'react-number-format'


const GroceryList = function (props) {

  const [list, setList] = useState([]);
  const [listName, setListName] = useState("")

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

  //pull grocery list from db when page renders and everytime the user clicks the generate recipe button
  useEffect(() => {
    axios.get(`/api/grocery_list/1`)
      .then((n) => { 
        console.log("here is the list", n.data.result)
        setListName(n.data.key)
        setList(n.data.result);
      })
      .catch(
        function (error) {
          console.log(error)
        }
      )
  }, [active]);


  const updateGroceryList = () => {
    //when triggered just the change of the active state variable which will 
    //run the above use effect and grab the updated grocery list
    axios.post(`/api/grocery_list/1`)
    .then(function (response) {
      console.log("ahoy")
      setActive((prev) => !prev)
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  return (
    <Grid container>
      <Grid sx={{margin: "auto"}}>
        <Typography variant="h3">
          Grocery List
        </Typography>
      </Grid>
      <Grid container justifyContent="center" sx={{padding: "20px"}}>
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
        <Button onClick={() => addIngredientItem(listName)} disabled={!dropValue} variant="outlined">Add to pantry</Button>
        <Button onClick={() => updateGroceryList()} variant="outlined">Generate List</Button>
      </Grid>
      <Grid>
        <IngredientList list={list} listName={listName} setList={setList}/>
      </Grid>
    </Grid>
  )
}
export default GroceryList