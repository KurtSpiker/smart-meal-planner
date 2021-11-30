import { useEffect, useState } from "react";
import RecipeSearchItem from "./RecipeSearchItem";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Backdrop, CircularProgress, ThemeProvider, Card, IconButton, Grid, Typography, ButtonGroup, Button, Tabs, Tab, AppBar } from "@mui/material";
import axios from "axios";


const RecipeCarousel = function (props) {
  const { testRecipies } = props
  const [recipes, setRecipes] = useState(testRecipies)
  const [currentRecipes, setCurrentRecipes] = useState(0)
  const [tabValue, setTabValue] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log(recipes)
    setLoading(true)
    axios.get(`/api/suggestions/${tabValue}`)
      .then((res) => {
        console.log("Results", res.data)
        setRecipes(res.data)
        setCurrentRecipes(0)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [tabValue])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };



  return (

    <Grid container justifyContent="center" spacing={2} marginTop="20px" >
      <Grid container justifyContent="center" >
        <Card sx={{ borderRadius: "30px" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="seconday"
            variant="fullWidth"
          >
            <Tab value="" label="For you!" />
            <Tab value="Italian" label="Italian" />
            <Tab value="Greek" label="Greek" />
            <Tab value="Mexican" label="Mexican" />
            <Tab value="Thai" label="Thai" />
            <Tab value="Korean" label="Korean" />
            <Tab value="Middle Eastern" label="Middle Eastern" />
          </Tabs>
        </Card>

      </Grid>
      {loading && <CircularProgress size="100px" color="secondary" sx={{ marginTop: "50px" }} />}
      {!loading && <Grid container justifyContent="center " spacing={2}>
        <IconButton onClick={() => {
          if (currentRecipes > 0) {
            setCurrentRecipes(currentRecipes - 1)
          }
        }}>
          <ChevronLeftIcon />
        </IconButton>
        <RecipeSearchItem recipe={recipes[currentRecipes]} />
        <RecipeSearchItem recipe={recipes[currentRecipes + 1]} />
        <RecipeSearchItem recipe={recipes[currentRecipes + 2]} />
        <IconButton onClick={() => {
          if ((currentRecipes + 2) < (recipes.length) - 1)
            setCurrentRecipes(currentRecipes + 1)
        }}>
          <ChevronRightIcon />
        </IconButton>
      </Grid>}
    </Grid>
  )
}
export default RecipeCarousel;