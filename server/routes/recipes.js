const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // search for a recipe using keywords
  // http://localhost:4000/api/recipes
  router.get("/", (req, res) => {

    let searchTerm = "pasta,italian";

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${searchTerm}`)
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // searching for a specific recipe using its spoonacular id
  // http://localhost:4000/api/recipes/648279
  router.get("/:id", (req, res) => {

    let recipeId = req.params.id;

    axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.API_KEY}&includeNutrition=false`)
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  });

  return router;
};
