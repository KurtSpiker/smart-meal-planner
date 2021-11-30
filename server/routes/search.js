const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // search for ingredient item before adding it in pantry
  // http://localhost:4000/api/search/ingredientTerm
  router.get("/ingredientTerm", (req, res) => {
    console.log("search", req.query)
    let data = req.query
    let ingredient = data.searchTerm.split(" ").join("-");

    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.API_KEY}&query=${ingredient}`)
      .then((response) => {
        res.send(response.data);
        console.log("GET to /search/ingredientTerm - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // get ingredient information by its spoonacular id
  // add &amount=1 to the end of the link for more information
  // http://localhost:4000/api/search/ingredientId/1077
  // https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.API_KEY}`)
  // https://spoonacular.com/recipeImages/19400-240x150.jpg?apiKey=44f44a53a6e64445a1156824595d2c98
  router.get("/ingredientId/:id", (req, res) => {

    let id = req.params.id; //spoonacular id

    axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.API_KEY}`)
      .then((response) => {
        let objectToReturn = {
          id: response.data.id,
          ingredientName: response.data.name,
          possibleUnits: response.data.possibleUnits,
          imageURL: response.data.image
        }
        res.send(objectToReturn);
        console.log("GET to /search/ingredientId/:id - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // user gets to see all their favourite recipes
  // http://localhost:4000/api/search/favourites
  router.get("/favourites", (req, res) => {

    const userId = req.cookies["user_id"];
    let recipeStore = [];

    db.getFavourites(userId)
      .then((result) => {
        console.log(result)

        let recipeIds = result.map((favouriteRecipe) => {
          return favouriteRecipe.spoonacular_id;
        })

        let ids = recipeIds.join(",");
        if (recipeIds.length > 0) {
          return axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${ids}`);
        }
      })
      .then((allRecipeInfo) => {

        if (allRecipeInfo) {
          for (const recipeDietery in allRecipeInfo.data) {
            recipeStore[recipeDietery] = {};
            recipeStore[recipeDietery].id = allRecipeInfo.data[recipeDietery].id;
            recipeStore[recipeDietery].title = allRecipeInfo.data[recipeDietery].title;

            recipeStore[recipeDietery].image = `https://spoonacular.com/recipeImages/${allRecipeInfo.data[recipeDietery].id}-636x393.jpg`;

            let dieteryRestrictions = {};
            dieteryRestrictions.vegan = allRecipeInfo.data[recipeDietery].vegan;
            dieteryRestrictions.glutenFree = allRecipeInfo.data[recipeDietery].glutenFree;
            dieteryRestrictions.dairyFree = allRecipeInfo.data[recipeDietery].dairyFree;
            dieteryRestrictions.vegetarian = allRecipeInfo.data[recipeDietery].vegetarian;

            recipeStore[recipeDietery].dieteryRestrictions = dieteryRestrictions;
            recipeStore[recipeDietery].favourite = true;
          }
        }
        res.send(recipeStore);
      })

  });

  return router;
};
