import { Grid, Card, CardMedia, CardHeader, CardActions, IconButton, Checkbox, ButtonBase, Fab } from "@mui/material";
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

const RecipeSearchItem = function (props) {
  const [dialogShow, setDialogShow] = useState(false)

  const { recipe } = props
  const { setDayInformation } = useContext(mealContext)

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
    <Grid item>
      {console.log("Its me", recipe.id)}
      {/* {dialogShow && <RecipeDialog dialogSwitch={dialogShow}/>} */ <RecipeDialog dialogSwitch={dialogShow} mealName={recipe.title} imageUrl={recipe.image} recipeId={recipe.id} />}
      <Card sx={{ maxWidth: 250, minWidth: 250, marginTop: '25px', borderRadius: '25px', minHeight: "440px", maxHeight: "430px" }}>
        <ButtonBase onClick={() => setDayInformation('', '', recipe.id)} component={Link} to={"/Recipe"}>
          <CardMedia
            component="img"
            image={recipe.image}
            alt="image"
            height="250"
          />
        </ButtonBase>
        <RecipeToolTip title={recipe.title} >
          <CardHeader
            title={recipe.title}
            sx={{
              height: "46px", textAlign: "center", alignItems: "start", overflow: "hidden"
            }}
          />
        </RecipeToolTip>
        <CardHeader
          subheader={dietaryDisplay(recipe)}
          sx={{ textAlign: "center", alignItems: "start", paddingBottom: 0, overflow: "hidden" }}
        />
        <CardActions sx={{ justifyContent: "space-between", paddingTop: 0 }}>
          <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />}>
          </Checkbox>
          <IconButton>
            <FoodBankIcon onClick={() => { handleShowChange() }} />
          </IconButton>
        </CardActions>
      </Card>
    </Grid >
  )
}

export default RecipeSearchItem