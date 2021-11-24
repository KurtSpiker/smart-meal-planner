import React, { useContext } from 'react';
import { mealContext } from '../../providers/MealProvider';
import { Grid, Stack, Typography, IconButton, ButtonBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DayMealsItem(props) {
  
  const { meal, mealType, onRemove, dayOfWeek, setSelectedMeal } = props
  const { setDayOfWeek, setTypeOfMeal } = useContext(mealContext);

  const specifyMeal = () => {
    setDayOfWeek(dayOfWeek);
    setTypeOfMeal(mealType);
    return;
  }

  return (
    <Grid container>
      <Grid item>
        <ButtonBase onClick={() => specifyMeal()} sx={{ width: 128, height: 128 }}>
          <img style={{width:"100%"}} alt="recipe" src={meal.image_link} />
        </ButtonBase>
      </Grid>
      
      <Stack justifyContent="center" alignItems="center" sx={{margin: "auto"}}>   
        <Typography variant="subtitle1" component="div">
          {mealType}
        </Typography>
        <Typography variant="body2">
          {meal.meal_name}
        </Typography>
      </Stack>

      <Grid item>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
        
      </Grid>
  
    </Grid>
  );
};