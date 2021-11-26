const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // search for ingredient item before adding it in pantry
  // http://localhost:4000/api/search/ingredientTerm
  router.get("/ingredientTerm", (req, res) => {

    let data = { searchTerm: "banana bread" }
    let ingredient = data.searchTerm.split(" ").join("-");

    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.API_KEY}&query=${ingredient}`)
      .then((response) => {
        res.send(response.data);
        console.log("GET to /search/ingredientTerm - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // get ingredient information by its spoonacular id
  // add &amount=1 to the end of the link for more information
  // http://localhost:4000/api/search/ingredientId/19400
  // https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.API_KEY}`)
  // 	https://spoonacular.com/recipeImages/19400-240x150.jpg?apiKey=44f44a53a6e64445a1156824595d2c98
  router.get("/ingredientId/:id", (req, res) => {

    let id = req.params.id; //spoonacular id

    axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.API_KEY}`)
      .then((response) => {
        let objectToReturn = {
          id: response.data.id,
          ingredientName: response.data.name,
          possibleUnits: response.data.possibleUnits,
          imageURL: response.data.image
        }
        res.send(objectToReturn);
        console.log("GET to /search/ingredientId/:id - Success.");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return router;
};
