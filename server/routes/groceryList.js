const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user requests to see their own grocery list
  // http://localhost:4000/api/grocery_list/:id
  router.get("/:id", (req, res) => {

    res.send("GET to http://localhost:4000/api/grocery_list/:id");

  });

  // user edits their grocery list
  // http://localhost:4000/api/grocery_list/:id/edit
  router.post("/:id/edit", (req, res) => {

    res.send("POST to http://localhost:4000/api/grocery_list/:id/edit");

  });

  // generate a grocery list based on user recipes
  // http://localhost:4000/api/grocery_list/1
  router.post("/:id", (req, res) => {

    // db call to return this
    let arrayOfRecipesForUser = [633884, 637591];
    let promises = [];
    let itemMeasuremementStrings = [];

    let groceryListForDb = [];

    // put all get requests into an array
    for (let i = 0; i < arrayOfRecipesForUser.length; i++) {
      promises.push(axios.get(`https://api.spoonacular.com/recipes/${arrayOfRecipesForUser[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
    }

    // pass array of promises and the then executes only after all promises resolve
    Promise.all(promises)
      .then((responses) => {
        // push all responses to an array
        for (const ingredient of responses[0].data.extendedIngredients) {
          itemMeasuremementStrings.push(ingredient["originalString"]);
        }
      })
      .then(() => {
        axios({
          method: 'post',
          url: `https://api.spoonacular.com/mealplanner/shopping-list/compute?apiKey=${process.env.API_KEY}`,
          data: {
            "items": itemMeasuremementStrings // pass array of ingredients to be aggregated (type and weight)
          }
        }).then((response) => {
          for (const item of response.data["aisles"]) {
            // remove items from their aisles into one array
            groceryListForDb = groceryListForDb.concat(item["items"]);
          }

          // stores all db calls into promise array
          promises = [];
          for (const ingredientObj of groceryListForDb) {
            promises.push(db.saveGroceryList(ingredientObj))
          }

          // calls db with all promises
          Promise.all(promises)
            .then((result) => {
              console.log("Successfully added grocery list:", result);
              res.send("Successfully added items into grocery list.");
            })
            .catch(e => {
              console.error(e);
              res.send(e)
            });

        }, (error) => {
          console.log(error);
        });
      }, (error) => {
        console.log(error);
      });
  });

  return router;
};

// THIS COMMENT IS FOR REFERENCE (Function will return actual ingredient measurements from recipes)
// router.post("/:id", (req, res) => {

//   // db call to return this
//   let arrayOfRecipesForUser = ["648279", "716429"];
//   let promises = [];
//   let objectToSendToDb = {};

//   for (let i = 0; i < arrayOfRecipesForUser.length; i++) {
//     promises.push(axios.get(`https://api.spoonacular.com/recipes/${arrayOfRecipesForUser[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
//   }

//   Promise.all(promises)
//     .then((responses) => {
//       for (const ingredient of responses[0].data.extendedIngredients) {
//         // if that item doesnt exist yet, create it
//         if (!objectToSendToDb[ingredient["id"]]) {
//           objectToSendToDb[ingredient["id"]] = { name: ingredient["name"], amount: ingredient["amount"], unit: ingredient["unit"] };
//         }
//         // if that item already exists in the object, add to existing
//         if (objectToSendToDb[ingredient["id"]]) {
//           objectToSendToDb[ingredient["id"]]["amount"] = objectToSendToDb[ingredient["id"]]["amount"] + ingredient["amount"];
//         }
//       }
//        console.log(objectToSendToDb);
//     });
// });
