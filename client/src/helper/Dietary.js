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

export function dietaryDisplay(recipe) {
  let subheaderTemplate = []
  let renderPusher = true;
  let objectToReturn = {};
  if (recipe.dieteryRestrictions.vegetarian) {
    renderPusher = false;
    subheaderTemplate.push(
      <RecipeToolTip title="Vegetarian" >
        <div>
          <img src={process.env.PUBLIC_URL + "/vegetarian.png"} alt="vegetarian" width="45px" height="45px" style={{ "marginRight": "2px", "margin-left": "2px" }} />
        </div>
      </RecipeToolTip>
    )
  }
  if (recipe.dieteryRestrictions.vegan) {
    renderPusher = false;
    subheaderTemplate.push(
      <RecipeToolTip title="Vegan" >
        <div>
          <img src={process.env.PUBLIC_URL + "/vegan-symbol.png"} alt="vegan" width="44px" height="45px" style={{ "marginRight": "2px", "marginLeft": "2px", "backgroundColor": "#00ff2a", "borderRadius": "100px", "border": "1px green solid" }} />
        </div>
      </RecipeToolTip>
    )
  }
  if (recipe.dieteryRestrictions.glutenFree) {
    renderPusher = false;
    subheaderTemplate.push(
      <RecipeToolTip title="Gluten Free" >
        <div>
          <img src={process.env.PUBLIC_URL + "/glutenfree.png"} alt="glutenfree" width="45px" height="45px" style={{ "backgroundColor": "#ecf2aa", "borderRadius": "100px", "marginRight": "2px", "marginLeft": "2px" }} />
        </div>
      </RecipeToolTip>
    )
  }
  if (recipe.dieteryRestrictions.dairyFree) {
    renderPusher = false;
    subheaderTemplate.push(
      <RecipeToolTip title="Dairy Free" >
        <div>
          <img src={process.env.PUBLIC_URL + "/dairyfree2.png"} alt="dairyfree" width="45px" height="45px" style={{ "marginRight": "2px", "marginLeft": "2px" }} />
        </div>
      </RecipeToolTip>
    )
  }

  objectToReturn["dieteryArray"] = subheaderTemplate;
  objectToReturn["renderPusher"] = renderPusher

  return objectToReturn
}