import React from 'react';
import { Grid, Typography } from '@mui/material';

import DayMealsItem from './DayMealsItem'

import '../index.css';

export default function DayMeals(props) {

  
  return (
    <Grid>
        <Grid>
          <Typography align="center" variant="h4" component="div">
            Day of Week Prop
          </Typography>
        </Grid>
        <Grid marginTop={0} container spacing={2} columns={3} wrap={"nowrap"}>
          <DayMealsItem />
          <DayMealsItem />
          <DayMealsItem />
        </Grid>
    </Grid>
  );

};