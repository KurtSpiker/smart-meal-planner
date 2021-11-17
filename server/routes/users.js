//THIS IS JUST A TEST ROUTE

const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  router.get("/", (req, res) => {

    db.getUserById()
      .then((data) => {
        res.send(data);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  // spoonacular test end point to search recipes with keywords
  // http://localhost:4000/api/users/searchRecipes/italian
  router.get("/searchRecipes/:searchTerm", (req, res) => {

    let searchTerm = req.params.searchTerm;
    let baseURL = `https://api.spoonacular.com/recipes/complexSearch?`

    axios.get(`${baseURL}apiKey=${process.env.API_KEY}&query=${searchTerm}`)
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });


  // spoonacular test end point to search recipes using your PANTRY
  // http://localhost:4000/api/users/searchPantry/egg,sausage,bread
  router.get("/searchPantry/:pantryItems", (req, res) => {

    let pantryItems = req.params.pantryItems;
    let baseURL = `https://api.spoonacular.com/recipes/findByIngredients?`

    axios.get(`${baseURL}apiKey=${process.env.API_KEY}&ingredients=${pantryItems}`)
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
