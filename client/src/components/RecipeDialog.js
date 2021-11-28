import { Dialog, DialogTitle, MenuItem, InputLabel, Select, OutlinedInput, DialogActions, Box, FormControl, DialogContent } from "@mui/material"
import { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button';
import { mealContext } from '../providers/MealProvider';
import axios from "axios";

export default function RecipeDialog(props) {

  const { typeOfMeal, dayOfWeek } = useContext(mealContext); //Add "weekNumber" when we add the feature for multiple weeks

  const { dialogSwitch, mealName, imageUrl, recipeId } = props

  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(dayOfWeek);
  const [meal, setMeal] = useState(typeOfMeal);

  useEffect(() => {
    console.log()
    return function cleanup() {
      setOpen(true)
    }
  }, [dialogSwitch]);

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };
  const handleMealChange = (event) => {
    setMeal(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const handleSendData = () => {
    //when user adds a recipe, add the recipe to their weekly list to the db
    axios.post(`/api/recipes/${recipeId}`, {
      week: 1,
      day,
      mealName,
      meal,
      imageUrl
    });
    handleClose();
  };

  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>When would you like to eat this?</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Day</InputLabel>
              <Select
                value={day}
                onChange={handleDayChange}
                input={<OutlinedInput label="Day" />}
              >
                <MenuItem value={"monday"}>Monday</MenuItem>
                <MenuItem value={"tuesday"}>Tuesday</MenuItem>
                <MenuItem value={"wednesday"}>Wednesday</MenuItem>
                <MenuItem value={"thursday"}>Thursday</MenuItem>
                <MenuItem value={"friday"}>Friday</MenuItem>
                <MenuItem value={"saturday"}>Saturday</MenuItem>
                <MenuItem value={"sunday"}>Sunday</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Meal</InputLabel>
              <Select
                value={meal}
                onChange={handleMealChange}
                input={<OutlinedInput label="Meal" />}
              >
                <MenuItem value={"breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"lunch"}>Lunch</MenuItem>
                <MenuItem value={"dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleSendData}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}