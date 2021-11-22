const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // search for a recipe using keywords
  // http://localhost:4000/api/recipes
  router.get("/", (req, res) => {

    let searchTerm = "pasta,italian";

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${searchTerm}`)
      .then((response) => {
        res.send(response.data);
        console.log("GET to /recipes - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // looking at a specific recipe using its spoonacular id
  // http://localhost:4000/api/recipes/648279
  router.get("/:id", (req, res) => {

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

    // https://api.spoonacular.com/recipes/633876/information?apiKey=8ba6b2219e2341128994d3733eb5e7fc&includeNutrition=false
    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`)
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

        dieteryRestrictions.vegetarian = response.data.vegetarian;
        dieteryRestrictions.vegan = response.data.vegan;
        dieteryRestrictions.vegetarian = response.data.vegetarian;
        dieteryRestrictions.glutenFree = response.data.glutenFree;
        dieteryRestrictions.dairyFree = response.data.dairyFree;

        let objectToSend = { recipeId, dieteryRestrictions, ingredientArray, title, time, servings, sourceUrl, image, summary, instructions };

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

    let data = { userId, week: 1, day: "monday", meal: "breakfast", spoonacularId, mealName: "Delicious Meal", imageUrl: 'https://spoonacular.com/recipeImages/633876-556x370.jpg' };

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

    let data = { userId, week: 1, day: "monday", meal: "breakfast", spoonacularId };

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
    let week = req.params.id

    db.getRecipesByUser(userId, week)
      .then((result) => {
        console.log("GET to /recipes/mealList/:id - Success.");
        res.send(result);
        console.log(result)
      }).catch((error) => {
        console.log(error);
      });
  });

  return router;
};
