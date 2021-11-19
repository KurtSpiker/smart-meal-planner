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

  // user makes a new grocery list? or add items in?
  // http://localhost:4000/api/grocery_list/1
  router.post("/:id", (req, res) => {

    //db call to return this
    let arrayOfRecipesForUser = ["648279", "716429"];
    let promises = [];
    let objectToSendToDb = {};

    for (let i = 0; i < arrayOfRecipesForUser.length; i++) {
      promises.push(axios.get(`https://api.spoonacular.com/recipes/${arrayOfRecipesForUser[i]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`))
    }

    Promise.all(promises)
      .then(responses => console.log(responses));

    // axios.get(`https://api.spoonacular.com/recipes/${arrayOfRecipesForUser[0]}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`)
    //   .then((response) => {
    //     // console.log(response.data.extendedIngredients);
    //     for (const ingredient of response.data.extendedIngredients) {
    //       // if that item doesnt exist yet, create it
    //       if (!objectToSendToDb[ingredient["id"]]) {
    //         objectToSendToDb[ingredient["id"]] = { name: ingredient["name"], amount: ingredient["amount"], unit: ingredient["unit"] };
    //       }
    //       // if that item already exists in the object, add to existing
    //       if (objectToSendToDb[ingredient["id"]]) {
    //         objectToSendToDb[ingredient["id"]]["amount"] = objectToSendToDb[ingredient["id"]]["amount"] + ingredient["amount"];
    //       }
    //     }
    //     console.log(objectToSendToDb)
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  });

  return router;
};
