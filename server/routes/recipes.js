const express = require('express');
const router = express.Router();
const axios = require('axios');
const { formatMealDays } = require("./routesHelpers");

module.exports = (db) => {

  // https://api.spoonacular.com/recipes/complexSearch?apiKey=44f44a53a6e64445a1156824595d2c98&query=pasta&number=2
  // search for a recipe using keywords
  // http://localhost:4000/api/recipes?search=Tomato%20tarte%20tatin
  router.get("/", (req, res) => {

    let userId = 1 // const userId = req.cookies["user_id"];
    let recipeStore = [];
    let searchTerm = `&query=${req.query.search}`;
    let numberDisplayed = `&number=5`;
    let favouritesArray = [];

    db.getFavourites(userId)
      .then((favourites) => {
        favouritesArray = favourites.map((fav) => {
          return fav.spoonacular_id;
        })
        return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}${searchTerm}${numberDisplayed}`);
      })
      .then((response) => {
        recipeStore = response.data;
        let recipeIds = [];
        for (const recipe of recipeStore.results) {
          recipeIds.push(recipe.id);
        }
        return recipeIds;
      })
      .then((recipeIds) => {
        // if it finds no recipes, gives [] to this section
        if (recipeIds.length > 0) {
          let ids = recipeIds.join(",");
          return axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${ids}`);
        }
      })
      .then((allRecipeInfo) => {
        // only if recipe info is found
        if (allRecipeInfo) {
          let dieteryRestrictions = {};
          for (const recipeDietery in allRecipeInfo.data) {
            dieteryRestrictions.vegetarian = allRecipeInfo.data[recipeDietery].vegetarian
            dieteryRestrictions.vegan = allRecipeInfo.data[recipeDietery].vegan;
            dieteryRestrictions.glutenFree = allRecipeInfo.data[recipeDietery].glutenFree;
            dieteryRestrictions.dairyFree = allRecipeInfo.data[recipeDietery].dairyFree;
            recipeStore.results[recipeDietery].dieteryRestrictions = dieteryRestrictions;

            if (favouritesArray.includes(allRecipeInfo.data[recipeDietery].id)) {
              recipeStore.results[recipeDietery].favourite = true;
            } else {
              recipeStore.results[recipeDietery].favourite = false;
            }

          }
        }
        res.send(recipeStore.results);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // looking at a specific recipe using its spoonacular id 663641 648279
  // http://localhost:4000/api/recipes/663641
  router.get("/:id", (req, res) => {

    let userId = 1;
    let recipeId = req.params.id;
    let ingredientArray = [];
    let title = "";
    let time = 0;
    let servings = 0;
    let sourceUrl = "";
    let image = "";
    let summary = "";
    let instructions = [];
    let dieteryRestrictions = {};
    let favourite = false;
    let favouritesArray = [];

    db.getFavourites(userId)
      .then((favourites) => {
        favouritesArray = favourites.map((fav) => {
          return fav.spoonacular_id;
        })
      }).then(() => {
        return axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`)
      })
      .then((response) => {

        for (const ingredient of response.data.extendedIngredients) {
          ingredientArray.push(ingredient["originalString"]);
        }

        title = response.data.title;
        time = response.data.readyInMinutes;
        servings = response.data.servings;
        sourceUrl = response.data.sourceUrl;
        image = response.data.image;
        summary = response.data.summary;
        servings = response.data.servings;

        for (const instruction of response.data.analyzedInstructions[0].steps) {
          instructions.push(instruction.step);
        }

        dieteryRestrictions.vegan = response.data.vegan;
        dieteryRestrictions.vegetarian = response.data.vegetarian;
        dieteryRestrictions.glutenFree = response.data.glutenFree;
        dieteryRestrictions.dairyFree = response.data.dairyFree;

        if (favouritesArray.includes(response.data.id)) {
          favourite = true;
        }

        let objectToSend = {
          recipeId,
          dieteryRestrictions,
          ingredientArray,
          title,
          time,
          servings,
          sourceUrl,
          image,
          summary,
          instructions,
          favourite
        };

        res.send(objectToSend);
        console.log("GET to /recipes/:id - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // adding a recipe to user's meal list
  // http://localhost:4000/api/recipes/649141
  router.post("/:id", (req, res) => {

    let userId = 1;  // const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    let data = { userId, week: 1, day: "tuesday", meal: "lunch", spoonacularId, mealName: "Delicious Meal", imageUrl: 'https://spoonacular.com/recipeImages/633876-556x370.jpg' };

    db.addRecipesForUser(data)
      .then((result) => {

        console.log("POST to /recipes/:id - Success.");
        res.send(result);
      }).catch((error) => {
        console.log(error);
      });

  });

  // deleting a recipe from a user's meal list
  // http://localhost:4000/api/recipes/649141
  router.delete("/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    let data = { userId, week: 1, day: "monday", meal: "lunch", spoonacularId };

    db.deleteRecipesForUser(data)
      .then((result) => {
        console.log("DELETE to /recipes/:id - Success.");
        res.send(result);
      }).catch((error) => {
        console.log(error);
      });
  });

  // gets users recipe schedule by the week
  // http://localhost:4000/api/recipes/mealList/1
  router.get("/mealList/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let week = req.params.id;

    db.getRecipesByUser(userId, week)
      .then((result) => {
        res.send(formatMealDays(result));
        console.log("GET to recipes/mealList/:id - Success.");
      }).catch((error) => {
        console.log(error);
      });
  });

  return router;
};
