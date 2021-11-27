import React, { useContext } from 'react';
import { mealContext } from '../../providers/MealProvider';
import { Grid, Stack, Typography, IconButton, ButtonBase } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from "react-router-dom";

export default function DayMealsItem(props) {
  
  const { meal, mealType, onRemove, dayOfWeek } = props
  const { setDayInformation } = useContext(mealContext);

  

  return (
    <Grid container>
      
      <Grid item>
        <ButtonBase 
          onClick={() => setDayInformation(dayOfWeek, mealType, meal.spoonacular_id)} 
          sx={{ width: 128, height: 128 }} 
          component={Link} 
          to={"/Recipe"}
        >
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
        <IconButton 
          onClick={() => setDayInformation(dayOfWeek, mealType, meal.spoonacular_id)} 
          component={Link}
          to={"/Recipe_search"}
          >
          <EditIcon />
        </IconButton>
        <IconButton onClick={onRemove}>
          <DeleteIcon />
        </IconButton>
      </Grid>
  
    </Grid>
  );
};