import React from 'react';
import { Grid, Typography } from '@mui/material';
import DayMealsItem from './DayMealsItem'

export default function DayMeals(props) {
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const { meals, dayOfWeek } = props;
  
  return (
    <Grid>
      {console.log(meals)}
        <Grid>
          <Typography align="center" variant="h4" component="div">
            {dayOfWeek}
          </Typography>
        </Grid>
        <Grid marginTop={0} container spacing={2} columns={3} wrap={"nowrap"}>
          {
            mealTypes.map((mealType) => {
              return (
                <Grid item xs={4}>
                  <DayMealsItem meal={meals[mealType]} mealType={mealType}/>
                </Grid>
              );
            })
          }
        </Grid>
    </Grid>
  );

};