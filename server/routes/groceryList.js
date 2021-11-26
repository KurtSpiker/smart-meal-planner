const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user requests to see their own grocery list
  // http://localhost:4000/api/grocery_list/1
  router.get("/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let week = req.params.id;

    db.getGroceryListByUser(userId, week)
      .then((result) => {
        console.log("GET to /grocery_list - Success.");
        res.send({ result, key: "grocery_list" });

      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  // user edits their grocery list
  // http://localhost:4000/api/grocery_list/edit/12345
  router.post("/edit/:id", (req, res) => {

    let spoonacularId = req.params.id;
    let userId = 1;// const userId = req.cookies["user_id"];


    let data = {userId, spoonacularId, quantity: req.body.quantity, week: req.body.week};
    // let data = { userId, spoonacularId, name: "some stuff i named", measure: "whatever", week: 1, week: 1 };

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

    let pantryStore = [];

    db.deleteGroceryList(userId, week) //for generating again only items that belong to recipes
      .then(() => {
        return db.getPantryByUser(userId); // get the pantry items to compare
      })
      .then((pantryInfo) => {
        pantryStore = pantryInfo;
        return db.getRecipesByUser(userId, week); // get user recipes to query ignredients
      })
      .then((arrayOfSpoonacularIdObjects) => {
        let arrayOfRecipesForUser = [];
        for (const id of arrayOfSpoonacularIdObjects) {
          arrayOfRecipesForUser.push(id["spoonacular_id"]); // push recipe ids to use later
        }
        return arrayOfRecipesForUser
      })
      .then((arrayOfRecipesForUser) => {
        // put all get requests into an array
        for (let i = 0; i < arrayOfRecipesForUser.length; i++) {
          promises.push(axios.get(`https://api.spoonacular.com/recipes/${arrayOfRecipesForUser[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
        }
        // pass array of promises to a promise.all
        return Promise.all(promises);
      })
      .then((responses) => {
        // get all recipe information
        let itemMeasuremementStrings = [];
        // push all ingredient information of responses to an array
        for (const response of responses) {
          for (const ingredient of response.data.extendedIngredients) {
            itemMeasuremementStrings.push(ingredient["originalString"]);
          }
        }
        itemMeasuremementStrings.push("-100g of fresh mozzarella");
        return itemMeasuremementStrings; // array will have multiple of the same item with different measures
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
        // response of items seperated by their aisle
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

        // get all the grocery ids
        let groceryIds = groceryListForDb.map((groceryItem) => {
          return groceryItem.ingredientId;
        })

        // get all the pantry ids
        let pantryIds = pantryStore.map((pantryItem) => {
          return pantryItem.spoonacular_ingredient_id
        })

        console.log("groceryItem", groceryIds)
        console.log("pantryItem", pantryIds)

        // filter for the ones that match and need conversion
        let ingredientsToConvert = groceryIds.filter((id) => {
          if (pantryIds.includes(id)) {
            return id;
          }
        })

        console.log("THIS NEEDS TO BE CONVERTED", ingredientsToConvert)
        console.log(groceryListForDb)
        promises = [];

        // https://api.spoonacular.com/recipes/convert?apiKey=${process.env.API_KEY}&ingredientName=flour&sourceAmount=2.5&sourceUnit=cups&targetUnit=grams

        // pantryStore
        // [ { id: 1,
        //   item_name: 'milk',
        //   user_id: 1,
        //   spoonacular_ingredient_id: 1077,
        //   quantity: '12',
        //   measure: 'tablespoon',
        //   image_link: 'milk.png' },
        // { id: 2,
        //   item_name: 'banana',
        //   user_id: 1,
        //   spoonacular_ingredient_id: 9040,
        //   quantity: '2',
        //   measure: '',
        //   image_link: 'banana.jpg' },
        // ]

        // groceryListForDb
        // INGREDIENT OBJ TO COMPARE WITH PANTRY {
        //   name: 'milk',
        //   measures:
        //   {
        //     original: { amount: 2, unit: 'cups' },
        //     metric: { amount: 488, unit: 'ml' },
        //     us: { amount: 16.6, unit: 'fl oz' }
        //   },
        //   pantryItem: false,
        //   aisle: 'Milk, Eggs, Other Dairy',
        //   cost: 66.17,
        //   ingredientId: 1077,
        //   imageUrl: 'milk.png'
        // }

        // but people can type all of this in
        //   {
        //     "id": 1077,
        //     "ingredientName": "dairy milk",
        //     "possibleUnits": [
        //         "quart",
        //         "g",
        //         "oz",
        //         "teaspoon",
        //         "fluid ounce",
        //         "cup",
        //         "serving",
        //         "tablespoon"
        //     ],
        //     "imageURL": "milk.png"
        // }

      })
      .then(() => {
        // stores all db calls into promise array
        promises = [];
        for (const ingredientObj of groceryListForDb) {

          // find out target measure from pantry (tbsp)
          // convert recipe amount to tbsp
          // subtract recipe amount tbsp - pantry amount tbsp
          promises.push(db.generateGroceryList(ingredientObj, userId, week))
        }
        // calls db with all promises
        return Promise.all(promises);

      })
      .then((result) => {
        res.send({ result, key: "grocery_list" });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};
