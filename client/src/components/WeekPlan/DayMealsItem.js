import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';


export default function DayMealsItem(props) {
  
  const { meal, mealType } = props

  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
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
    </Paper>
  );
};