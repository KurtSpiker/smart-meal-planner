const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user requests to see their own grocery list
  // http://localhost:4000/api/grocery_list/1
  router.get("/:id", (req, res) => {

    const userId = req.cookies["user_id"];
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
    const userId = req.cookies["user_id"];

    let data = { userId, spoonacularId, quantity: req.body.quantity, week: req.body.week };

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
  // http://localhost:4000/api/grocery_list/delete/12345
  router.delete("/delete/:id", (req, res) => {

    const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    let data = { userId, spoonacularId, week: 1 };

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
  // http://localhost:4000/api/grocery_list/add/17166
  router.post("/add/:id", (req, res) => {

    const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    // will be from req.body
    let data = { userId, name: req.body.name, quantity: req.body.quantity, week: req.body.week, measure: req.body.measure, spoonacularId, imageLink: req.body.imageLink };

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

    const userId = req.cookies["user_id"];
    let week = req.params.id;
    let promises = [];
    let groceryListForDb = [];

    let pantryStore = [];
    let pantryStoreWithIdKeys = {};
    let ingredientsToConvert = [];

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

        // filter for the ones that match and need conversion
        ingredientsToConvert = groceryIds.filter((id) => {
          if (pantryIds.includes(id)) {
            return id;
          }
        })

        console.log("ingredients that need to be converted from inital step", ingredientsToConvert)

        // french bread = 18266/ it has a measure for one as ""
        // console.log(JSON.stringify(groceryListForDb, null, 2))

        for (const item of pantryStore) {
          pantryStoreWithIdKeys[item.spoonacular_ingredient_id] = {
            name: item.item_name,
            quantity: item.quantity,
            measure: item.measure
          }
        }

        // show the kind of measurements the outputConversion will receive
        // console.log("PANTRY WITH ID KEYS", pantryStoreWithIdKeys)

        // for some reason filter didnt work, but map does but has undefined for ones that dont fit the if statement
        let axiosIngredientInformation = groceryListForDb.map((groceryListForDbItems) => {
          if (ingredientsToConvert.includes(groceryListForDbItems.ingredientId)) {
            return {
              name: groceryListForDbItems.name,
              spoonacularId: groceryListForDbItems.ingredientId,
              measure: groceryListForDbItems.measures.metric.unit,
              amount: groceryListForDbItems.measures.metric.amount
            }
          }
        })
        // removing the undefined values from above
        let noUndefinedAxios = axiosIngredientInformation.filter((items) => {
          return items !== undefined;
        })

        console.log("These grocery ingredients are in my pantry->", noUndefinedAxios)

        // populating promises to return with noUndefinedAxios which has all the information it needs along with pantryStoreWithIdKeys to compare
        // https://api.spoonacular.com/recipes/convert?apiKey=8fc98d21e6c34ca0ba2782a7e1466616&ingredientName=parmesan cheese&sourceAmount=100&sourceUnit=g&targetUnit=kg
        promises = [];
        for (const item of noUndefinedAxios) {
          promises.push(axios.get(`https://api.spoonacular.com/recipes/convert?apiKey=${process.env.API_KEY}&ingredientName=${item.name}&sourceAmount=${item.amount}&sourceUnit=${item.measure}&targetUnit=${pantryStoreWithIdKeys[item.spoonacularId].measure}`))
        }
        return Promise.all(promises);
      })
      .then((result) => {
        console.log("Resulting axios conversion for index 0 ->", (result.length > 0 ? result[0].data : []))

        let ingredientsToValidate = {}
        for (const itemIndex in result) {
          console.log("INDEX IS " + itemIndex + " SUBTRACTING " + result[itemIndex].data.targetAmount + " FROM " + pantryStore[itemIndex].quantity)

          ingredientsToValidate[ingredientsToConvert[itemIndex]] =
          {
            // rest of data is to validate if this is in sync
            name: pantryStoreWithIdKeys[ingredientsToConvert[itemIndex]].name,
            pantryAmount: pantryStoreWithIdKeys[ingredientsToConvert[itemIndex]].quantity,
            pantryMeasure: pantryStoreWithIdKeys[ingredientsToConvert[itemIndex]].measure,
            groceryListConversion: result[itemIndex].data.answer,
            groceryListAmount: result[itemIndex].data.targetAmount,
            groceryListMeasure: result[itemIndex].data.targetUnit,
            // subtraction amount is what we really want
            resultingSubtraction: result[itemIndex].data.targetAmount - pantryStoreWithIdKeys[ingredientsToConvert[itemIndex]].quantity
          }
        }
        return ingredientsToValidate;
      })
      .then((ingredientsToValidate) => {
        // stores all db calls into promise array
        promises = [];
        for (const ingredientObj of groceryListForDb) {
          // using the test data, thyme should NOT be in grocery list items
          promises.push(db.generateGroceryList(ingredientObj, userId, week, ingredientsToValidate, ingredientsToConvert))
        }
        // calls db with all promises
        return Promise.all(promises);
      })
      .then((result) => {
        // return ingredient appear null because db skips negative quantity
        res.send({ result, key: "grocery_list" });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};
