const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // search for ingredient item before adding it in pantry
  // http://localhost:4000/api/pantry/searchIngredient/banana
  router.get("/searchIngredient/:id", (req, res) => {
    let ingredient = req.params.id;

    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.API_KEY}&query=${ingredient}`)
      .then((response) => {
        res.send(response.data);
        console.log("GET to /pantry/searchIngredient/:id - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // get ingredient information by its spoonacular id
  // add &amount=1 to the end of the link for more information
  // http://localhost:4000/api/pantry/searchIngredientById/19400
  router.get("/searchIngredientById/:id", (req, res) => {

    let id = req.params.id;


    axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.API_KEY}`)
      .then((response) => {
        let objectToReturn = {
          id: response.data.id,
          ingredientName: response.data.name,
          possibleUnits: response.data.possibleUnits,
          imageURL: response.data.image
        }
        res.send(objectToReturn);
        console.log("GET to /pantry/searchIngredientById/:id - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });


  // user clicks on pantry and front end requests those items from server
  // http://localhost:4000/api/pantry
  router.get("/", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];

    db.getPantryByUser(userId)
      .then((results) => {
        console.log("GET to /pantry - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user edits their pantry
  // http://localhost:4000/api/pantry/edit/1
  router.post("/edit/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let itemDbId = req.params.id;

    let data = { userId, itemDbId, name: "apple juice", quantity: 121 };

    db.editPantryItem(data)
      .then((results) => {
        console.log("POST to /pantry/edit/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user adds an item to their pantry
  // http://localhost:4000/api/pantry/9016
  router.post("/:id", (req, res) => {

    let spoonacularId = req.params.id;
    let userId = 1;

    let data = { userId, name: "apple juice", quantity: 500, measure: "ml", spoonacularId, imageLink: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2311311/5d527098b97f5abb7cc54619bcb3c7fe_large.png&width=256&type=webp&quality=80' };

    db.addPantryItem(data)
      .then((results) => {
        console.log("POST to /pantry/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user deletes an item off their pantry
  // http://localhost:4000/api/pantry/1
  router.delete("/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let itemDbId = req.params.id;

    let data = { userId, itemDbId };

    db.deletePantryItem(data)
      .then((results) => {
        console.log("DELETE to /pantry/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};
