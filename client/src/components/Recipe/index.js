import { useState } from 'react'
import { useEffect } from 'react';
import { Grid, Card, CardHeader, Backdrop, CircularProgress, Typography, Fab } from '@mui/material'
import RecipeIngredientsList from './RecipeIngredientsList'
import InstructionsList from './InstructionsList'
// import { recipe } from '../../sampleRecipe'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import useRecipe from '../../hooks/useRecipe'
import { dietaryDisplay } from '../../helper/Dietary';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "./RecipeStyle.css"
import RecipeDialog from '../RecipeDialog';
const axios = require('axios');


export default function Recipe() {
  const [dialogShow, setDialogShow] = useState(false)

  const { recipe, loading } = useRecipe();
  const recipeItems = recipe.ingredientArray
  const instructionItems = recipe.instructions
  const [joke, setJoke] = useState("")

  const handleShowChange = () => {
    if (dialogShow) {
      setDialogShow(false)
      return
    }
    setDialogShow(true)
  }

  useEffect(() => {
    axios.get(`/api/suggestions/joke`)
      .then((result) => {
        setJoke(result.data[0].joke)
        console.log(result.data[0].joke);
      })
  }, [])


  return (
    <div>
      <RecipeDialog dialogSwitch={dialogShow} mealName={recipe.title} imageUrl={recipe.image} recipeId={recipe.recipeId} />
      {loading && (<Backdrop
        open={true}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>)}
      {!loading && (<Grid container justifyContent="center">
        <Card sx={{ position: "relative", width: "95%" }}>
          <Grid container >
            <Grid item container xs={6}>
              <CardHeader
                title={recipe.title}
                subheader={joke}
                sx={{ textAlign: "left", paddingLeft:"30px"}}
                />
              <Grid container spacing={4}  textAlign="center" sx={{paddingLeft: "30px"}}>
                <Grid item>
                  <span>
                    <AccessTimeIcon />
                    <p>{recipe.time} minutes</p>
                  </span>
                </Grid>
                <Grid item>
                  <Typography className="dieteryHolderRecipeIndex">
                    {dietaryDisplay(recipe).dieteryArray}
                  </Typography>
                </Grid>
                <Grid item>
                  <RestaurantIcon />
                  <p>{recipe.servings} servings</p>
                </Grid>
              </Grid>
              <Grid container>
                <RecipeIngredientsList recipeItems={recipeItems} />
              </Grid>
              <Grid container>
                <InstructionsList instructionItems={instructionItems} />
              </Grid>
            </Grid>
            <Grid item container xs={6} >
              <Grid item>
                <img src={recipe.image} alt="recipe" style={{width: "100%", margin: "10px"}}/>
              </Grid>
            </Grid>
          </Grid>
        </Card>
        <Fab onClick={() => { handleShowChange() }} color="primary" aria-label="edit" className="fixed" sx={{ position: "fixed", right: '5rem' }}><AddIcon /></Fab>
        <Fab color="secondary" aria-label="like" className="fixed" sx={{ position: "fixed" }}><FavoriteIcon /></Fab>
      </Grid>)}
    </div>
  )
};