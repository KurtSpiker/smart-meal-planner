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

        let objectToSend = { recipeId, ingredientArray, title, time, servings, sourceUrl, image, summary, instructions };

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

    let userId = 1;
    let data = { userId, week: 1, day: "monday", meal: "breakfast", spoonacularId: req.params.id };

    db.addRecipesForUser(data)
      .then((result) => {

        console.log("POST to /recipes/:id - Success.");
        res.send(result)
      }).catch((error) => {
        console.log(error);
      });

  });

  // deleting a recipe from a user's meal list
  // http://localhost:4000/api/recipes/649141
  router.delete("/:id", (req, res) => {

    let userId = 1;
    let data = { userId, week: 1, day: "monday", meal: "breakfast", spoonacularId: req.params.id };

    db.deleteRecipesForUser(data)
      .then((result) => {
        console.log("DELETE to /recipes/:id - Success.");
        res.send(result);
      }).catch((error) => {
        console.log(error);
      });
  });


  http://localhost:4000/api/recipes/mealList/:id
  router.get("/mealList/:id", (req, res) => {

    let userId = 1;
    let week = req.params.id

    db.getRecipesByUser(userId, week)
      .then((result) => {
        console.log("GET to /recipes/mealList/:id - Success.");
        res.send(result);
      }).catch((error) => {
        console.log(error);
      });
  });

  return router;
};
