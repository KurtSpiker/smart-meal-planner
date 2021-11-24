import { Autocomplete, Grid, Typography, TextField, Card, CardMedia, CardHeader, CardActions, Icon, IconButton, Checkbox } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import { padding } from "@mui/system";
import RecipeDialog from "./RecipeDialog";
import { useState, forceUpdate } from "react"


const RecipeSearchItem = function (props) {
  const [dialogShow, setDialogShow] = useState(false)

  const { recipe, test } = props

  const handleShowChange = () => {
    
    if(dialogShow) {
      setDialogShow(false)
      return
    }
    setDialogShow(true) 
  }

  
  const Dietary = function() {
    if (!test) {
      return "subheader"
    }
    let subheaderTemplate = []
    if (recipe.dieteryRestrictions.vegetarian) {
      subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/vegetarian.png"} alt="picture" width="45px" height="45px"/>)
    }
    if (recipe.dieteryRestrictions.vegan) {
      subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/vegan-symbol.png"} alt="picture" width="45px" height="45px"/>)
    }
    if (recipe.dieteryRestrictions.glutenfree) {
      subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/glutenfree.png"} alt="picture" width="45px" height="45px"/>)
    }
    if (recipe.dieteryRestrictions.dairyfree) {
      subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/dairyfree2.png"} alt="picture" width="45px" height="45px"/>)
    }
    return subheaderTemplate
  }

  return (
    <Grid item>
      {/* {dialogShow && <RecipeDialog dialogSwitch={dialogShow}/>} */ <RecipeDialog dialogSwitch={dialogShow} mealName={recipe.title} imageUrl={recipe.image} recipeId={recipe.id}/>}
      <Card sx={{ maxWidth: 250, minWidth: 250 }}>
        <CardMedia
          component="img"
          image={recipe.image}
          alt="image"
          height="250"
          width="250"
        />
        <CardHeader
          title={recipe.title}
          subheader={Dietary()}
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