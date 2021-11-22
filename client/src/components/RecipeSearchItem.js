import { Autocomplete, Grid, Typography, TextField, Card, CardMedia, CardHeader } from "@mui/material";
import { recipe } from '../sampleRecipe'

const Dietary = function() {
  let subheaderTemplate = []
  if (recipe.dieteryRestrictions.vegetarian) {
    subheaderTemplate.push("vegetarian")
  }
  if (recipe.dieteryRestrictions.vegan) {
    subheaderTemplate.push("vegan")
  }
  if (recipe.dieteryRestrictions.glutenFree) {
    subheaderTemplate.push("glutenfree")
  }
  if (recipe.dieteryRestrictions.dairyFree) {
    subheaderTemplate.push("Dairyfree")
  }
  return subheaderTemplate.toString()
}

const RecipeSearchItem = function (props) {
  const { testRecipe } = props
  return (
    <Grid item>
      <Card sx={{ maxWidth: 250, minWidth: 250 }}>
        <CardMedia
          component="img"
          image={testRecipe.image}
          alt="image"
          height="250"
          width="250"
        />
        <CardHeader
          title={testRecipe.title}
          subheader={Dietary()}
          sx={{ textAlign: "center" }}
        />
      </Card>
    </Grid>
  )
}

export default RecipeSearchItem