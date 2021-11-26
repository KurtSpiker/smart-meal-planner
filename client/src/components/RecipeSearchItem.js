import { Grid, Card, CardMedia, CardHeader, CardActions, IconButton, Checkbox, ButtonBase, Fab } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import RecipeDialog from "./RecipeDialog";
import { useState, useContext } from "react"
import { mealContext } from "../providers/MealProvider"
import { Link } from "react-router-dom";
import { dietaryDisplay } from "../helper/Dietary";

const RecipeSearchItem = function (props) {
  const [dialogShow, setDialogShow] = useState(false)

  const { recipe } = props
  const { setDayInformation } = useContext(mealContext)

  const handleShowChange = () => {
    if(dialogShow) {
      setDialogShow(false)
      return
    }
    setDialogShow(true) 
  }


  return (
    <Grid item>
      {console.log("Its me" ,recipe.id)}
      {/* {dialogShow && <RecipeDialog dialogSwitch={dialogShow}/>} */ <RecipeDialog dialogSwitch={dialogShow} mealName={recipe.title} imageUrl={recipe.image} recipeId={recipe.id}/>}
      <Card sx={{ maxWidth: 250, minWidth: 250 }}>
        <ButtonBase onClick={() => setDayInformation('', '', recipe.id)} component={Link} to={"/Recipe"}>
          <CardMedia
            component="img"
            image={recipe.image}
            alt="image"
            height="250"
            width="250"
          />
        </ButtonBase>
        <CardHeader
          title={recipe.title}
          subheader={dietaryDisplay(recipe)}
          sx={{ textAlign: "center", paddingBottom: 0 }}
        />
        <CardActions sx={{ justifyContent: "space-between", paddingTop: 0}}>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}>
          </Checkbox>
          <IconButton>
            <FoodBankIcon onClick={() => {handleShowChange()}}/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default RecipeSearchItem