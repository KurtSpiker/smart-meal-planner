import React from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import DayMealsItem from './DayMealsItem'
import { styled } from '@mui/material/styles';

export default function DayMeals(props) {
  const mealTypes = ["breakfast", "lunch", "dinner"];
  const { meals, dayOfWeek, removeMeal } = props;

  const Title = styled(Typography)
  (`
    
      font-family: 'Questrial', sans-serif;
      text-transform: capitalize

  `);

  return (
    <Grid sx={{ paddingBottom: "20px" }}>
      <Grid>
        <Title align="center" variant="h4" component="div">
          {dayOfWeek}
        </Title>
      </Grid>
      <Grid marginTop={0} container spacing={2} columns={3} wrap={"nowrap"}>
        {
          mealTypes.map((mealType) => {
            return (
              <Grid key={mealType} item xs={4}>
                <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1, borderRadius: '20px' }}>
                  <DayMealsItem
                    dayOfWeek={dayOfWeek}
                    meal={meals[mealType]}
                    mealType={mealType}
                    removeMeal={removeMeal}
                  />
                </Paper>
              </Grid>
            );
          })
        }
      </Grid>
    </Grid >
  );

};