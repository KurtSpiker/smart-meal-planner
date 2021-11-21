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

  // user clicks on pantry and front end requests those items from server
  // http://localhost:4000/api/pantry/1
  router.get("/:id", (req, res) => {

    let userId = req.params.id;

    db.getPantryByUser(userId)
      .then((results) => {
        console.log("GET to /pantry/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user edits their pantry
  // http://localhost:4000/api/pantry/1/edit
  router.post("/:id/edit", (req, res) => {

    let data = { userId: req.params.id, itemDbId: 1, name: "apple juice", quantity: 121 };

    db.editPantryItem(data)
      .then((results) => {
        console.log("POST to /pantry/:id/edit - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user adds an item to their pantry
  // http://localhost:4000/api/pantry/1
  router.post("/:id", (req, res) => {

    let data = { userId: req.params.id, name: "apple juice", quantity: 500, measure: "ml", spoonacularId: 12345, imageLink: 'https://ipcdn.freshop.com/resize?url=https://images.freshop.com/2311311/5d527098b97f5abb7cc54619bcb3c7fe_large.png&width=256&type=webp&quality=80' };

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

    let data = { userId: req.params.id, itemDbId: 1 };

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
