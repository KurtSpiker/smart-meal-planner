const express = require('express');
const router = express.Router();
const axios = require('axios');
const { formatMealDays } = require("./routesHelpers");

module.exports = (db) => {

  // https://api.spoonacular.com/recipes/complexSearch?apiKey=44f44a53a6e64445a1156824595d2c98&query=pasta&number=2
  // search for a recipe using keywords
  // http://localhost:4000/api/recipes?search=Nachos%20Grande
  // router.get("/", (req, res) => {

  //   const userId = req.cookies["user_id"];
  //   let recipeStore = [];
  //   // let recipeSend = []; //for sort function
  //   let searchTerm = `&query=${req.query.search}`;
  //   let numberDisplayed = `&number=5`;
  //   let favouritesArray = [];

  //   db.getFavourites(userId)
  //     .then((favourites) => {
  //       favouritesArray = favourites.map((fav) => {
  //         return fav.spoonacular_id;
  //       })
  //       return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}${searchTerm}${numberDisplayed}`);
  //     })
  //     .then((response) => {
  //       recipeStore = response.data.results;
  //       let recipeIds = [];
  //       for (const recipe of recipeStore) {
  //         recipeIds.push(recipe.id);
  //       }
  //       return recipeIds;
  //     })
  //     .then((recipeIds) => {
  //       // if it finds no recipes, gives [] to this section
  //       let ids = recipeIds.join(",");
  //       if (recipeIds.length > 0) {

  //         // [ 646545, 633876, 638784 ]
  //         // https://api.spoonacular.com/recipes/informationBulk?apiKey=44f44a53a6e64445a1156824595d2c98&ids=638784
  //         return axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${ids}`);
  //       }
  //     })
  //     .then((allRecipeInfo) => {

  //       if (allRecipeInfo) {

  //         for (const recipeDietery in allRecipeInfo.data) {
  //           let dieteryRestrictions = {};
  //           dieteryRestrictions.vegan = allRecipeInfo.data[recipeDietery].vegan;
  //           dieteryRestrictions.glutenFree = allRecipeInfo.data[recipeDietery].glutenFree;
  //           dieteryRestrictions.dairyFree = allRecipeInfo.data[recipeDietery].dairyFree;
  //           dieteryRestrictions.vegetarian = allRecipeInfo.data[recipeDietery].vegetarian;
  //           recipeStore[recipeDietery].dieteryRestrictions = dieteryRestrictions;

  //           if (favouritesArray.includes(allRecipeInfo.data[recipeDietery].id)) {
  //             recipeStore[recipeDietery].favourite = true;
  //           } else {
  //             recipeStore[recipeDietery].favourite = false;
  //           }

  //         }
  //       }
  //       res.send(recipeStore);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });

  // looking at a specific recipe using its spoonacular id 663641 648279
  // http://localhost:4000/api/recipes/715594
  router.get("/:id", (req, res) => {

    const userId = req.cookies["user_id"];
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

        // https://api.spoonacular.com/recipes/13265/information?apiKey=44f44a53a6e64445a1156824595d2c98&includeNutrition=false
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
        // image = response.data.image; // revert back if image gives errors
        image = `https://spoonacular.com/recipeImages/${recipeId}-636x393.${response.data.imageType}`
        summary = response.data.summary;
        servings = response.data.servings;

        if (response.data.analyzedInstructions.length > 0) {
          for (const instruction of response.data.analyzedInstructions[0].steps) {
            instructions.push(instruction.step);
          }
        } else {
          instructions = [];
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

    const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    let data = { ...req.body, spoonacularId, userId };

    db.deleteRecipesForUser(data)
      .then(() => {
        return db.addRecipesForUser(data);
      })
      .then((result) => {
        console.log("POST to /recipes/:id - Success.");
        res.send(result);
      }).catch((error) => {
        console.log(error);
      });
  });

  // deleting a recipe from a user's meal list
  // http://localhost:4000/api/recipes
  router.delete("/", (req, res) => {

    const userId = req.cookies["user_id"];

    let data = { ...req.body, userId };

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

    const userId = req.cookies["user_id"];
    let week = req.params.id;

    db.getRecipesByUser(userId, week)
      .then((result) => {
        res.send(formatMealDays(result));
        console.log("GET to recipes/mealList/:id - Success.");
      }).catch((error) => {
        console.log(error);
      });
  });



  // // search for a recipe using keywords (improved?)
  // // http://localhost:4000/api/recipes?search=Nachos%20Grande
  router.get("/", (req, res) => {

    const userId = req.cookies["user_id"];
    let recipeStore = [];
    let searchTerm = `&query=${req.query.search}` + "%20";
    let numberDisplayed = `&number=5`;
    let favouritesArray = [];

    let promises = [];

    db.getFavourites(userId)
      .then((favourites) => {
        favouritesArray = favourites.map((fav) => {
          return fav.spoonacular_id;
        })
        // https://api.spoonacular.com/recipes/complexSearch?apiKey=44f44a53a6e64445a1156824595d2c98&query=
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
          for (let i = 0; i < recipeIds.length; i++) {
            promises.push(axios.get(`https://api.spoonacular.com/recipes/${recipeIds[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
          }
          return Promise.all(promises);
        }
      })
      .then((allRecipeInfo) => {
        // only if recipe info is found
        if (allRecipeInfo) {
          for (const recipeDietery in allRecipeInfo) {
            let dieteryRestrictions = {};
            dieteryRestrictions.vegetarian = allRecipeInfo[recipeDietery].data.vegetarian
            dieteryRestrictions.vegan = allRecipeInfo[recipeDietery].data.vegan;
            dieteryRestrictions.glutenFree = allRecipeInfo[recipeDietery].data.glutenFree;
            dieteryRestrictions.dairyFree = allRecipeInfo[recipeDietery].data.dairyFree;
            recipeStore.results[recipeDietery].dieteryRestrictions = dieteryRestrictions;

            if (favouritesArray.includes(allRecipeInfo[recipeDietery].data.id)) {
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

  return router;
};

