const express = require('express');
const router = express.Router();
const axios = require('axios');
const { randomRecipes } = require("./routesHelpers");

module.exports = (db) => {

  // ranking ->	Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
  // display -> The maximum number of recipes to return (between 1 and 100). Defaults to 10.
  // ignorePantry -> 	Whether to ignore typical pantry items, such as water, salt, flour, etc.

  // https://api.spoonacular.com/recipes/findByIngredients?apiKey=3cb5c5c2b8a042d9b6818458a9ad1bbc&ingredients=apples,flour,sugar&number=2
  // frontend -> server -> api for suggested recipes based on pantry
  // http://localhost:4000/api/suggestions
  router.get("/", (req, res) => {

    // get data from front end
    let data = { numberToDisplay: 10, ignorePantry: true, ranking: 1 }
    const userId = req.cookies["user_id"];

    // get pantry items from db
    let pantryArray = [];
    let numberToDisplay = `&number=${data.numberToDisplay}`;
    let ignorePantry = `&ignorePantry=${data.ignorePantry}`;
    let ranking = `&ranking=${data.ranking}`;

    // data storage
    let recipeStore = [];
    let favouritesArray = [];

    db.getPantryByUser(userId)
      .then((results) => {

        if (results.length > 0) {
          for (const pantryItem of results) {
            pantryArray.push(pantryItem.item_name)
          }
          return axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${pantryArray.join(",")}${numberToDisplay}${ignorePantry}${ranking}`);
        } else {
          return axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=pasta${numberToDisplay}${ignorePantry}${ranking}`);
        }
      })
      .then((response) => {
        console.log("2. GOT RECIPES FROM API USING PANTRY");
        for (const res of response.data) {
          recipeStore.push({ id: res.id, title: res.title, image: res.image });
        }
        return db.getFavourites(userId);
      })
      .then((favourites) => {
        favouritesArray = favourites.map((fav) => {
          return fav.spoonacular_id;
        });
      })
      .then(() => {
        let recipeIds = [];
        for (const recipe of recipeStore) {
          recipeIds.push(recipe.id);
        }
        let ids = recipeIds.join(",");
        return axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${ids}`);

      }).then((allRecipeInfo) => {
        // only if recipe info is found

        for (const recipeDietery in allRecipeInfo.data) {
          let dieteryRestrictions = {};
          dieteryRestrictions.vegetarian = allRecipeInfo.data[recipeDietery].vegetarian
          dieteryRestrictions.vegan = allRecipeInfo.data[recipeDietery].vegan;
          dieteryRestrictions.glutenFree = allRecipeInfo.data[recipeDietery].glutenFree;
          dieteryRestrictions.dairyFree = allRecipeInfo.data[recipeDietery].dairyFree;

          recipeStore[recipeDietery].dieteryRestrictions = dieteryRestrictions;

          if (favouritesArray.includes(allRecipeInfo.data[recipeDietery].id)) {
            recipeStore[recipeDietery].favourite = true;
          } else {
            recipeStore[recipeDietery].favourite = false;
          }
        }
      })
      .then(() => {
        res.send(recipeStore);
        console.log("GET to /suggestions - Success.");
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // end point for generate recipes based on cuisine and choosing some randomly to display
  // http://localhost:4000/api/suggestions/italian
  // https://api.spoonacular.com/recipes/complexSearch?apiKey=44f44a53a6e64445a1156824595d2c98&cuisine=italian&number=10
  // router.get("/:id", (req, res) => {

  //   const userId = req.cookies["user_id"];
  //   let recipeStore = [];
  //   let cuisine = `&cuisine=${req.params.id}`;
  //   let numberDisplayed = `&number=10`;
  //   let favouritesArray = [];

  //   console.log("1. AXIOS CALLS FOR RECIPES BY CUISINE");

  //   db.getFavourites(userId)
  //     .then((favourites) => {
  //       favouritesArray = favourites.map((fav) => {
  //         return fav.spoonacular_id;
  //       })
  //       return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}${cuisine}${numberDisplayed}`)
  //     })
  //     .then((response) => {
  //       console.log("2. GOT RECIPES FOR CUISINE AND PUT INTO RECIPESTORE");
  //       recipeStore = response.data;
  //       let recipeIds = [];
  //       for (const recipe of recipeStore.results) {
  //         recipeIds.push(recipe.id);
  //       }
  //       console.log("3. PUSHED RECIPES IDS IN AN ARRAY FOR SEARCHING");
  //       return recipeIds;
  //     })
  //     .then((recipeIds) => {
  //       let ids = recipeIds.join(",");
  //       console.log("4. STARTING AXIOS CALL FOR ALL IDS")
  //       return axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${process.env.API_KEY}&ids=${ids}&includeNutrition=false`);
  //     })
  //     .then((allRecipeInfo) => {
  //       console.log("5. FINISHED AXIOS CALL TO GET INFORMATION BULK FROM IDS");
  //       // only if recipe info is found

  //       for (const recipeDietery in allRecipeInfo.data) {
  //         let dieteryRestrictions = {};
  //         dieteryRestrictions.vegetarian = allRecipeInfo.data[recipeDietery].vegetarian
  //         dieteryRestrictions.vegan = allRecipeInfo.data[recipeDietery].vegan;
  //         dieteryRestrictions.glutenFree = allRecipeInfo.data[recipeDietery].glutenFree;
  //         dieteryRestrictions.dairyFree = allRecipeInfo.data[recipeDietery].dairyFree;

  //         recipeStore.results[recipeDietery].dieteryRestrictions = dieteryRestrictions;

  //         if (favouritesArray.includes(allRecipeInfo.data[recipeDietery].id)) {
  //           recipeStore.results[recipeDietery].favourite = true;
  //         } else {
  //           recipeStore.results[recipeDietery].favourite = false;
  //         }
  //       }
  //       console.log("6. FINISHED LOOPING OVER RESULT DATA TO PUT DITERY NEEDS INTO RECIPE STORE");

  //       // out of the 20 recipes (0 to 19) pick 5
  //       let arrayNumbers = randomRecipes(10, 5);
  //       console.log("6. PICKED THE RANDOM NUMBERS", arrayNumbers);
  //       let arrayToSend = [];

  //       for (const number of arrayNumbers) {
  //         arrayToSend.push(recipeStore.results[number])
  //       }
  //       console.log("7. PUSHED THE RECIPES TO DISPLAY INTO ARRAY");

  //       res.send(arrayToSend);
  //       console.log("8. DONE");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // });




  // generates a random food joke. this is my greatest creation.
  // http://localhost:4000/api/suggestions/joke
  router.get("/joke", (req, res) => {

    let number = Math.floor(Math.random() * 57 + 1);

    db.generateJoke(number)
      .then((results) => {
        console.log("GET to /suggestions/joke - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });


  // IMPROVED RECIPE SUGGESTION SEARCH
  // http://localhost:4000/api/suggestions/italian
  router.get("/:id", (req, res) => {

    const userId = req.cookies["user_id"];
    let recipeStore = [];
    let cuisine = `&cuisine=${req.params.id}`;
    let numberDisplayed = `&number=10`;
    let favouritesArray = [];
    let promises = [];

    console.log("1. AXIOS CALLS FOR RECIPES BY CUISINE");

    db.getFavourites(userId)
      .then((favourites) => {
        favouritesArray = favourites.map((fav) => {
          return fav.spoonacular_id;
        })
        return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}${cuisine}${numberDisplayed}`)
      })
      .then((response) => {
        console.log("2. GOT RECIPES FOR CUISINE AND PUT INTO RECIPESTORE");
        recipeStore = response.data;
        let recipeIds = [];
        for (const recipe of recipeStore.results) {
          recipeIds.push(recipe.id);
        }
        console.log("3. PUSHED RECIPES IDS IN AN ARRAY FOR SEARCHING");
        return recipeIds;
      })
      .then((recipeIds) => {

        for (let i = 0; i < recipeIds.length; i++) {
          promises.push(axios.get(`https://api.spoonacular.com/recipes/${recipeIds[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
        }
        console.log("4. INITIATING PROMISE ALL");
        return Promise.all(promises);
      })
      .then((allRecipeInfo) => {
        console.log("5. FINISHED AXIOS CALL TO GET INFORMATION BULK FROM IDS");
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
          console.log("6. FINISHED LOOPING OVER RESULT DATA TO PUT DITERY NEEDS INTO RECIPE STORE");
        }
        // out of the 20 recipes (0 to 19) pick 5
        let arrayNumbers = randomRecipes(9, 5);
        console.log("6. PICKED THE RANDOM NUMBERS", arrayNumbers);
        let arrayToSend = [];

        for (const number of arrayNumbers) {
          arrayToSend.push(recipeStore.results[number])
        }
        console.log("7. PUSHED THE RECIPES TO DISPLAY INTO ARRAY");

        res.send(arrayToSend);
        console.log("8. DONE");

        console.log("SENDING THIS ARRAY", arrayToSend)
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
