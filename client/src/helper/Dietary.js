export function dietaryDisplay(recipe) {
  let subheaderTemplate = []
  if (recipe.dieteryRestrictions.vegetarian) {
    subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/vegetarian.png"} alt="vegetarian" width="45px" height="45px" style={{ "margin-right": "2px", "margin-left": "2px" }} />)
  }
  if (recipe.dieteryRestrictions.vegan) {
    subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/vegan-symbol.png"} alt="vegan" width="45px" height="45px" style={{ "margin-right": "2px", "margin-left": "2px" }} />)
  }
  if (recipe.dieteryRestrictions.glutenFree) {
    subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/glutenfree.png"} alt="glutenfree" width="45px" height="45px" style={{ "margin-right": "2px", "margin-left": "2px" }} />)
  }
  if (recipe.dieteryRestrictions.dairyFree) {
    subheaderTemplate.push(<img src={process.env.PUBLIC_URL + "/dairyfree2.png"} alt="dairyfree" width="45px" height="45px" style={{ "margin-right": "2px", "margin-left": "2px" }} />)
  }
  //   return (
  //     <Stack spacing={1} direction="row" ml="auto" mr="auto" width="50%">
  //       {subheaderTemplate}
  //     </Stack>
  //   )
  //
  return subheaderTemplate
}