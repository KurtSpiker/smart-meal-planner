import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@mui/material';

import DayMealsItem from '../components/DayMealsItem'

import '../index.css';

export default function DayMeals(props) {

  
  return (
    <main>
      <div>Day of the Week Prop</div>
      <div>
        <Grid marginTop={0} container spacing={2} columns={3}>
          <DayMealsItem />
          <DayMealsItem />
          <DayMealsItem />
        </Grid>
      </div>
    </main>
  );

};