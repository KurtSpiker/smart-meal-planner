const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user requests to see their own grocery list
  // http://localhost:4000/api/grocery_list/1
  router.get("/:id", (req, res) => {

    let userId = req.params.id;

    db.getGroceryListByUser(userId)
      .then((results) => {
        console.log("GET to /grocery_list/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  // user edits their grocery list
  // http://localhost:4000/api/grocery_list/1/edit
  router.post("/:id/edit", (req, res) => {

    // will be from req.body
    let data = { userId: 1, itemDbId: 1, name: "some stuff i named", measure: "whatever", week: 1, week: 1 };

    db.editGroceryList(data)
      .then((results) => {
        console.log("POST to /grocery_list/:id/edit - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });


  // user deletes a grocery list item
  // http://localhost:4000/api/grocery_list/1/delete
  router.delete("/:id/delete", (req, res) => {

    // will be from req.body
    let data = { userId: req.params.id, id: 2, week: 1 };

    db.deleteGroceryListItem(data)
      .then((results) => {
        console.log("POST to /grocery_list/:id/delete - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user adds a grocery list item
  // http://localhost:4000/api/grocery_list/1/add
  router.post("/:id/add", (req, res) => {

    // will be from req.body
    let data = { userId: req.params.id, name: "apples", quantity: 10, measure: "", week: 1 };

    db.addGroceryListItem(data)
      .then((results) => {
        console.log("POST to /grocery_list/:id/add - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });


  // generate a grocery list based on user recipes
  // http://localhost:4000/api/grocery_list/1
  router.post("/:id", (req, res) => {

    let userId = req.params.id;
    let week = 1;
    // let arrayOfRecipesForUser = [633884, 637591];
    let arrayOfRecipesForUser = [];
    let promises = [];
    let itemMeasuremementStrings = [];
    let groceryListForDb = [];

    db.deleteGroceryList(userId, week)
      .then(() => {

        db.getRecipesByUser(userId, week)
          .then((arrayOfSpoonacularIdObjects) => {
            for (const id of arrayOfSpoonacularIdObjects) {
              arrayOfRecipesForUser.push(id["spoonacular_id"]);
            }
          })
          .then(() => {
            // put all get requests into an array
            for (let i = 0; i < arrayOfRecipesForUser.length; i++) {
              promises.push(axios.get(`https://api.spoonacular.com/recipes/${arrayOfRecipesForUser[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
            }
            // pass array of promises and the then executes only after all promises resolve
            Promise.all(promises)
              .then((responses) => {
                // push all responses to an array
                // console.log("THIS IS A SINGLE RESPONSE DATA ", responses[1].id);
                for (const response of responses) {
                  for (const ingredient of response.data.extendedIngredients) {
                    itemMeasuremementStrings.push(ingredient["originalString"]);
                  }
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
                    promises.push(db.generateGroceryList(ingredientObj, userId, week))
                  }
                  // calls db with all promises
                  Promise.all(promises)
                    .then((result) => {
                      console.log("POST to grocery_list/:id - Success.");
                      res.send(result);
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
          })
          .catch(e => {
            console.error(e);
            res.send(e)
          });
      }).catch(e => { // <-brace for deleting user entries
        console.error(e);
        res.send(e)
      }); // <-brace for deleting user entries's catch block
  });
  return router;
};
