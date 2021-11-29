import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const RecipeToolTip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 'none',
    fontSize: 18
  },
});

// <RecipeToolTip title={recipe.title} >
// <CardHeader
//   title={recipe.title}
//   sx={{
//     height: "46px", textAlign: "center", alignItems: "start", overflow: "hidden"
//   }}
// />
// </RecipeToolTip>

export function dietaryDisplay(recipe) {
  let subheaderTemplate = []
  if (recipe.dieteryRestrictions.vegetarian) {
    subheaderTemplate.push(
      <RecipeToolTip title="Vegetarian" >
        <div>
          <img src={process.env.PUBLIC_URL + "/vegetarian.png"} alt="vegetarian" width="45px" height="45px" style={{ "marginRight": "2px", "margin-left": "2px" }} />
        </div>
      </RecipeToolTip>
    )
  }
  if (recipe.dieteryRestrictions.vegan) {
    subheaderTemplate.push(
      <RecipeToolTip title="Vegan" >
        <div>
          <img src={process.env.PUBLIC_URL + "/vegan-symbol.png"} alt="vegan" width="45px" height="45px" style={{ "marginRight": "2px", "marginLeft": "2px" }} />
        </div>
      </RecipeToolTip>
    )
  }
  if (recipe.dieteryRestrictions.glutenFree) {
    subheaderTemplate.push(
      <RecipeToolTip title="Gluten Free" >
        <div>
          <img src={process.env.PUBLIC_URL + "/glutenfree.png"} alt="glutenfree" width="45px" height="45px" style={{ "marginRight": "2px", "marginLeft": "2px" }} />
        </div>
      </RecipeToolTip>
    )
  }
  if (recipe.dieteryRestrictions.dairyFree) {
    subheaderTemplate.push(
      <RecipeToolTip title="Dairy Free" >
        <div>
          <img src={process.env.PUBLIC_URL + "/dairyfree2.png"} alt="dairyfree" width="45px" height="45px" style={{ "marginRight": "2px", "marginLeft": "2px" }} />
        </div>
      </RecipeToolTip>
    )
  }
  return subheaderTemplate
}