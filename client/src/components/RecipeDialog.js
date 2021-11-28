import { Card, Typography, Dialog, DialogTitle, MenuItem, InputLabel, Select, OutlinedInput, DialogActions, Box, FormControl, DialogContent, Popover, CardContent } from "@mui/material"
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
  const [popUp, setPopUp] = useState(false)

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

  const togglePopUp = () => {
    setPopUp(true)
    setTimeout(function() {
      setPopUp(false)
    },3500)
  }

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
          <Button variant="contained" color="error" onClick={() => {handleClose()}}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={() => {handleSendData(); togglePopUp()}}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      { popUp && 
        <Card sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: "tooltip", backgroundColor: "#2e7d32", boxShadow: 7 }}>
          <CardContent>
            <Typography fontWeightBold="700" color="white" variant="h6" textAlign="center" sx={{fontWeightBold: 700}}>
              Your recipe has been saved!
            </Typography>
          </CardContent>
        </Card>
      }
    </div>
  );
}