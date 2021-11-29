import { Grid, Card, CardMedia, CardHeader, CardActions, IconButton, Checkbox, ButtonBase } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import RecipeDialog from "./RecipeDialog";
import { useState, useContext } from "react"
import { mealContext } from "../providers/MealProvider"
import { Link } from "react-router-dom";
import { dietaryDisplay } from "../helper/Dietary";
import { RecipeCard } from "../customstyles/RecipeCard";

const RecipeSearchItem = function (props) {
  const [dialogShow, setDialogShow] = useState(false)

  const { recipe } = props
  const { setDayInformation, dayOfWeek, typeOfMeal } = useContext(mealContext)

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
      {console.log("Its me", recipe.id)}
      {/* {dialogShow && <RecipeDialog dialogSwitch={dialogShow}/>} */ <RecipeDialog dialogSwitch={dialogShow} mealName={recipe.title} imageUrl={recipe.image} recipeId={recipe.id} />}
      <RecipeCard>
        <ButtonBase onClick={() => setDayInformation('', '', recipe.id)} component={Link} to={"/Recipe"}>
          <CardMedia
            component="img"
            image={recipe.image}
            alt="image"
            height="250"
          />
        </ButtonBase>
        <RecipeToolTip title={recipe.title} >
          <div>
            <CardHeader
              title={recipe.title}
              sx={{
                height: "46px", textAlign: "center", alignItems: "start", overflow: "hidden"
              }}
            />
          </div>
        </RecipeToolTip>
        <div className="dieteryHolder">
          {dietaryDisplay(recipe)}
        </div>
        <CardActions sx={{ justifyContent: "space-between", paddingTop: 0 }}>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}>
          </Checkbox>
          <IconButton>
            <FoodBankIcon onClick={() => { handleShowChange() }} />
          </IconButton>
        </CardActions>
      </RecipeCard>
    </Grid >
  )
}

export default RecipeSearchItem