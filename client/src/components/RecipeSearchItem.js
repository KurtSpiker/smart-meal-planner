import { Autocomplete, Grid, Typography, TextField, Card, CardMedia, CardHeader } from "@mui/material";

// const Dietary = function() {
//   let subheaderTemplate = []
//   if (recipe.dieteryRestrictions.vegetarian) {
//     subheaderTemplate.push("vegetarian")
//   }
//   if (recipe.dieteryRestrictions.vegan) {
//     subheaderTemplate.push("vegan")
//   }
//   if (recipe.dieteryRestrictions.glutenFree) {
//     subheaderTemplate.push("glutenfree")
//   }
//   if (recipe.dieteryRestrictions.dairyFree) {
//     subheaderTemplate.push("Dairyfree")
//   }
//   return subheaderTemplate.toString()
// }

const RecipeSearchItem = function (props) {

  const { recipe } = props
  console.log(props);
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
          subheader="Dietary"
          sx={{ textAlign: "center" }}
        />
      </Card>
    </Grid>
  )
}

export default RecipeSearchItem