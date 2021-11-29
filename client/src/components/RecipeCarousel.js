import { useState } from "react";
import RecipeSearchItem from "./RecipeSearchItem";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Card, IconButton, Grid, Typography } from "@mui/material";



const RecipeCarousel = function(props){
  const { testRecipies } = props
  const [currentRecipes, setCurrentRecipes] = useState(0)


  return (
    
      <Grid container justifyContent="center" spacing={2}>
        <Grid container justifyContent="center">
          <Typography variant="h4">Category</Typography>
        </Grid>
        <IconButton onClick={() => {
          if (currentRecipes > 0) {
            setCurrentRecipes(currentRecipes -1)
          }
        }}>
          <ChevronLeftIcon/>
        </IconButton>
          <RecipeSearchItem recipe={testRecipies[currentRecipes]}/>
          <RecipeSearchItem recipe={testRecipies[currentRecipes + 1]}/>
          <RecipeSearchItem recipe={testRecipies[currentRecipes + 2]}/>
        <IconButton onClick={() => {
          if ((currentRecipes + 2) < (testRecipies.length) - 1)
            setCurrentRecipes(currentRecipes + 1)
        }}>
          <ChevronRightIcon/>
        </IconButton>
      </Grid>
  )
}
export default RecipeCarousel;