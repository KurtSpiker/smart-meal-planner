import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import DayMealsItem from './DayMealsItem'

export default function DayMeals(props) {
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const { meals, dayOfWeek, setSelectedMeal } = props;
  
  return (
    <Grid sx={{paddingBottom: "20px"}}>
      <Grid>
        <Typography align="center" variant="h4" component="div">
          {dayOfWeek}
        </Typography>
      </Grid>
      <Grid marginTop={0} container spacing={2} columns={3} wrap={"nowrap"}>
        {
          mealTypes.map((mealType) => {
            return (
              <Grid key={mealType} item xs={4}>
                <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
                  <DayMealsItem 
                    setSelectedMeal={setSelectedMeal} 
                    dayOfWeek={dayOfWeek} 
                    meal={meals[mealType]} 
                    mealType={mealType}/>
                </Paper>
              </Grid>
            );
          })
        }
      </Grid>
    </Grid>
  );

};