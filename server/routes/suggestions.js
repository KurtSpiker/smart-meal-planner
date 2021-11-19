const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // frontend -> server -> for suggested recipes based on pantry
  // http://localhost:4000/api/suggestions
  router.get("/", (req, res) => {

    // get pantry items from db
    let pantryItems = "apple,spaghetti,tomato,orange,lemon,rice,chocolate,broccoli,asparagus,avocado"

    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${pantryItems}`)
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
