import { Dialog, DialogTitle, MenuItem, InputLabel, Select, OutlinedInput, DialogActions, Box, FormControl, DialogContent } from "@mui/material"
import { react, useState, useEffect } from 'react'
import Button from '@mui/material/Button';

export default function RecipeDialog(props) {

  const { dialogSwitch } = props
  
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState('');
  const [meal, setMeal] = useState('');

  useEffect(() => {
    console.log("hello")
    return function cleanup() {
      setOpen(true)
    }
  },[dialogSwitch]);

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };
  const handleMealChange = (event) => {
    setMeal(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
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
                input={<OutlinedInput label="Day"/>}
              >
                <MenuItem value={"Monday"}>Monday</MenuItem>
                <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                <MenuItem value={"Thursday"}>Thursday</MenuItem>
                <MenuItem value={"Friday"}>Friday</MenuItem>
                <MenuItem value={"Saturday"}>Saturday</MenuItem>
                <MenuItem value={"Sunday"}>Sunday</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Meal</InputLabel>
              <Select
                value={meal}
                onChange={handleMealChange}
                input={<OutlinedInput label="Meal" />}
              >
                <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                <MenuItem value={"Dinner"}>Dinner</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{justifyContent: "space-between"}}>
          <Button variant="contained" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}