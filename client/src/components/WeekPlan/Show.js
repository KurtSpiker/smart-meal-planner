import React from 'react';
import {Grid, Typography, ButtonBase } from '@mui/material';

export default function DayMealsItem(props) {
  
  const { meal, mealType } = props

  return (
    <Grid container>
      <Grid item>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <img style={{width:"100%"}} alt="recipe" src={meal.image_link} />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>   
        <Grid item xs>
          <Typography gutterBottom variant="subtitle1" component="div">
            {mealType}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {meal.meal_name}
          </Typography>
          <ButtonBase sx={{ cursor: 'pointer' }} variant="body2" color="text.secondary">
            Recipe Details Link
          </ButtonBase>
        </Grid>
      </Grid>
    </Grid>
  );
};