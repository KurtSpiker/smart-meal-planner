import React from 'react';
import {Grid, Box, Stack, Typography, Button, ButtonBase } from '@mui/material';

export default function DayMealsItem(props) {
  
  const { meal, mealType } = props

  return (
    <Grid container>
      <Grid item>
        <ButtonBase sx={{ width: 128, height: 128 }}>
          <img style={{width:"100%"}} alt="recipe" src={meal.image_link} />
        </ButtonBase>
      </Grid>
      
      <Stack justifyContent="center" alignItems="center" sx={{paddingLeft: "5%"}}>   
        <Typography variant="subtitle1" component="div">
          {mealType}
        </Typography>
        <Typography variant="body2">
          {meal.meal_name}
        </Typography>
        <Button variant="outlined">
          Recipe Details
        </Button>
      </Stack>
  
    </Grid>
  );
};