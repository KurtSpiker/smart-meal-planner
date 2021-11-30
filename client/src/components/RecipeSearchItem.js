import { Grid, Card, CardMedia, CardHeader, CardActions, IconButton, Checkbox, ButtonBase } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import RecipeDialog from "./RecipeDialog";
import { useState, useContext, useEffect } from "react"
import { mealContext } from "../providers/MealProvider"
import { Link } from "react-router-dom";
import { dietaryDisplay } from "../helper/Dietary";
import { RecipeCard } from "../customstyles/RecipeCard";
import axios from "axios";
import useFavouritesRender from "../hooks/useFavoritesRender";

const RecipeSearchItem = function (props) {
  const { recipe } = props
  const { setDayInformation, dayOfWeek, typeOfMeal } = useContext(mealContext)
  const [dialogShow, setDialogShow] = useState(false)
  const { heart, handleFavorite, handleRender } = useFavouritesRender(recipe.id, recipe.favourite)


  const handleShowChange = () => {
    if (dialogShow) {
      setDialogShow(false)
      return
    }
    setDialogShow(true)
  }

  // for toooltip
  const RecipeToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 'none',
      fontSize: 18
    },
  });

  return (
    <Grid item >
      {console.log("Recipe in question", recipe.title, recipe.image, recipe.id)}
      {/* {dialogShow && <RecipeDialog dialogSwitch={dialogShow}/>} */ <RecipeDialog dialogSwitch={dialogShow} mealName={recipe.title} imageUrl={recipe.image} recipeId={recipe.id} />}
      <RecipeCard>
        <ButtonBase onClick={() => setDayInformation(dayOfWeek, typeOfMeal, recipe.id)} component={Link} to={"/Recipe"}>
          <CardMedia sx={{
            border: "2px solid rgb(231, 179, 7)", borderRadius: "20px", marginTop: "5px", marginLeft: "5px", width: "235px"
          }}
            component="img"
            image={recipe.image}
            alt="image"
            height="240"

          />
        </ButtonBase>
        <RecipeToolTip title={recipe.title} >
          <div>
            <CardHeader
              title={recipe.title}
              sx={{
                height: "46px", textAlign: "center", alignItems: "start", overflow: "hidden", marginTop: "-10px",
              }}
            />
          </div>
        </RecipeToolTip>

        {dietaryDisplay(recipe).renderPusher ?
          <div className="dieteryHolderSearchPusher">

          </div>
          :
          <div className="dieteryHolderSearch">
            {dietaryDisplay(recipe).dieteryArray}
          </div>
        }

        <CardActions sx={{ justifyContent: "space-between", paddingTop: 0 }}>
          <Checkbox onChange={() => { handleFavorite() }} checked={heart} icon={<Favorite />} checkedIcon={<Favorite color="blue" />}></Checkbox>
          <IconButton>
            <FoodBankIcon onClick={() => { handleShowChange() }} />
          </IconButton>
        </CardActions>
      </RecipeCard>
    </Grid >
  )
}

export default RecipeSearchItem