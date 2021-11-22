import React from 'react';
import ReactDOM from 'react-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import '../index.css';

export default function DayMealsItem(props) {
  return (
    
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
          <img style={{width:"100%"}} src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format&dpr=2" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Meal Prop
              </Typography>
              <Typography variant="body2" gutterBottom>
                Recipe Title Prop
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