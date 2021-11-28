import { Grid, Typography, TextField, Autocomplete, Button, Select, MenuItem, Stack, Backdrop, CircularProgress } from '@mui/material';
import IngredientList from "./IngredientList";
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import axios from "axios";
import useIngredients from "../hooks/useIngredients";
import NumberFormat from 'react-number-format'
import groceryListIcon from './images/grocery.png'


const GroceryList = function (props) {

  const [list, setList] = useState([]);
  const [listName, setListName] = useState("");
  const [loading, setLoading] = useState(false);

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
        setListName(n.data.key);
        setList(n.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      }
      )
  }, [active]);

  const updateGroceryList = () => {
    //when triggered just the change of the active state variable which will 
    //run the above use effect and grab the updated grocery list
    setLoading(true);
    axios.post(`/api/grocery_list/1`)
      .then(() => {
        setActive((prev) => !prev)
      })
      .catch((error) => {
        console.log(error.message);
      });

  };

  // custom colour button for entering item
  const ColorButton = styled(Button)(({ theme }) => ({
    fontWeight: "bold",
    color: "rgb(78, 0, 0)",
    backgroundColor: "rgb(247,191,80,0.65)",
    '&:hover': {
      backgroundColor: "#f7bf50",
    },
    height: "56px"
  }));

  return (
    <div>
      {loading && (
        <Backdrop
          open={true}
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>)
      }

      {!loading && (
        <>
          <Typography variant="h3">
            <img className="groceryListPageIcon" src={groceryListIcon} />
            Grocery List
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

            <Grid item xs={3}>
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
                <ColorButton onClick={() => addIngredientItem(listName)} disabled={!dropValue} variant="contained" >Add to Groceries</ColorButton>
                <ColorButton onClick={() => updateGroceryList()} variant="outlined">Generate List</ColorButton>
              </Stack>
            </Grid>
            <IngredientList list={list} listName={listName} setList={setList} />
          </Grid>
        </>
      )}
    </div>
  );
}
export default GroceryList
