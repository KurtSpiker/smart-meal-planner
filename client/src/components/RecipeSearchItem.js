import { Autocomplete, Grid, Typography, TextField, Card, CardMedia, CardHeader, CardActions, Icon, IconButton } from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import FavoriteIcon from '@mui/icons-material/Favorite';


const RecipeSearchItem = function (props) {

  const { recipe } = props
  
  const Dietary = function() {
    let subheaderTemplate = []
    if (recipe.dieteryRestrictions.vegetarian) {
      subheaderTemplate.push("vegetarian")
    }
    if (recipe.dieteryRestrictions.vegan) {
      subheaderTemplate.push("vegan")
    }
    if (recipe.dieteryRestrictions.glutenfree) {
      subheaderTemplate.push("glutenfree")
    }
    if (recipe.dieteryRestrictions.dairyfree) {
      subheaderTemplate.push("Dairyfree")
    }
    return subheaderTemplate.toString()
  }

  return (
    <Grid item>
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
          sx={{ textAlign: "center" }}
        />
        <CardActions sx={{ justifyContent: "space-between"}}>
          <IconButton>
            <FavoriteIcon/>
          </IconButton>
          <IconButton>
            <FoodBankIcon/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default RecipeSearchItem