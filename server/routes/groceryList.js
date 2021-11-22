const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user requests to see their own grocery list
  // http://localhost:4000/api/grocery_list
  router.get("/", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];

    db.getGroceryListByUser(userId)
      .then((results) => {
        console.log("GET to /grocery_list - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  // user edits their grocery list
  // http://localhost:4000/api/grocery_list/edit/1
  router.post("/edit/:id", (req, res) => {

    let itemDbId = req.params.id;
    let userId = 1;// const userId = req.cookies["user_id"];
    let data = { userId, itemDbId, name: "some stuff i named", measure: "whatever", week: 1, week: 1 };

    db.editGroceryList(data)
      .then((results) => {
        console.log("POST to /grocery_list/edit/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user deletes a grocery list item
  // http://localhost:4000/api/grocery_list/delete/1
  router.delete("/delete/:id", (req, res) => {

    // will be from req.body
    let userId = 1;// const userId = req.cookies["user_id"];
    let itemDbId = req.params.id;

    let data = { userId, itemDbId, week: 1 };

    db.deleteGroceryListItem(data)
      .then((results) => {
        console.log("DELETE to /grocery_list/delete/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user adds a grocery list item
  // http://localhost:4000/api/grocery_list/add/18019
  router.post("/add/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    // will be from req.body
    let data = { userId, name: "banana bread", quantity: 10, week: 1, measure: "loaf", imageUrl: "quick-bread.png", spoonacularId };

    db.addGroceryListItem(data)
      .then((results) => {
        console.log("POST to /grocery_list/add/:id - Success.");
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

    let userId = 1; // const userId = req.cookies["user_id"];
    let week = req.params.id;
    let promises = [];
    let groceryListForDb = [];

    db.deleteGroceryList(userId, week)
      .then(() => {
        return db.getRecipesByUser(userId, week);
      })
      .then((arrayOfSpoonacularIdObjects) => {
        let arrayOfRecipesForUser = [];
        for (const id of arrayOfSpoonacularIdObjects) {
          arrayOfRecipesForUser.push(id["spoonacular_id"]);
        }

        return arrayOfRecipesForUser
      })
      .then((arrayOfRecipesForUser) => {
        // put all get requests into an array
        for (let i = 0; i < arrayOfRecipesForUser.length; i++) {
          promises.push(axios.get(`https://api.spoonacular.com/recipes/${arrayOfRecipesForUser[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
        }
        // pass array of promises
        return Promise.all(promises);

      })
      .then((responses) => {
        let itemMeasuremementStrings = [];
        // push all responses to an array
        // console.log("THIS IS A SINGLE RESPONSE DATA ", responses[1].id);
        for (const response of responses) {
          for (const ingredient of response.data.extendedIngredients) {
            itemMeasuremementStrings.push(ingredient["originalString"]);
          }
        }
        return itemMeasuremementStrings;
      })
      .then((itemMeasuremementStrings) => {
        return axios({
          method: 'post',
          url: `https://api.spoonacular.com/mealplanner/shopping-list/compute?apiKey=${process.env.API_KEY}`,
          data: {
            "items": itemMeasuremementStrings // pass array of ingredients to be aggregated (type and weight)
          }
        })
      })
      .then((response) => {
        for (const item of response.data["aisles"]) {
          // remove items from their aisles into one array
          groceryListForDb = groceryListForDb.concat(item["items"]);
        }

        let promises = [];
        for (const ingredient of groceryListForDb) {
          promises.push(axios.get(`https://api.spoonacular.com/food/ingredients/${ingredient.ingredientId}/information?apiKey=${process.env.API_KEY}`))
        }

        return Promise.all(promises);
      }).then((result) => {

        for (let i = 0; i < groceryListForDb.length; i++) {
          groceryListForDb[i].imageUrl = result[i].data.image;
        }

        // stores all db calls into promise array
        promises = [];
        for (const ingredientObj of groceryListForDb) {
          promises.push(db.generateGroceryList(ingredientObj, userId, week))
        }
        // calls db with all promises
        return Promise.all(promises);
      })
      .then((result) => {
        console.log("POST to grocery_list/:id - Success.");
        res.send(result);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};
