import { useState } from "react";
import RecipeSearchItem from "./RecipeSearchItem";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton, Grid, Typography } from "@mui/material";



const RecipeCarousel = function(props){
  const { testRecipies } = props
  const [currentRecipes, setCurrentRecipes] = useState(0)
  return (
    
      <Grid container sx={{maxWidth: 350}}>
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
        <RecipeSearchItem testRecipe={testRecipies[currentRecipes]}/>
        <IconButton onClick={() => {
          if (currentRecipes < (testRecipies.length) - 1)
            setCurrentRecipes(currentRecipes + 1)
        }}>
          <ChevronRightIcon/>
        </IconButton>
      </Grid>
  )
}
export default RecipeCarousel;