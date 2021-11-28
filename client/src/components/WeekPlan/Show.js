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
    <Grid container >

      <Grid item>
        <ButtonBase
          onClick={() => setDayInformation(dayOfWeek, mealType, meal.spoonacular_id)}
          sx={{ width: 128, height: 128 }}
          component={Link}
          to={"/Recipe"}
        >
          <img style={{ height: "125px", width: "150px", objectFit: "cover", borderRadius: "15px", marginLeft: "50px", marginTop: "20px", border: "1px solid grey" }} alt="recipe" src={meal.image_link} />
        </ButtonBase>
      </Grid>

      <Stack justifyContent="center" alignItems="left" sx={{ margin: "auto" }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', fontSize: "20px" }}>
          {mealType[0].toUpperCase() + mealType.substring(1)}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "16px" }}>
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

    </Grid >
  );
};