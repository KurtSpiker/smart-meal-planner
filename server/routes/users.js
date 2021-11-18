//THIS IS JUST A TEST ROUTE

// Attention: Only the first query parameter is prefixed with a ? (question mark), all subsequent ones will be prefixed with a & (ampersand). That is // how URLs work and nothing related to our API. Here's a full example with two parameters apiKey and includeNutrition:
// https://api.spoonacular.com/recipes/716429/information?apiKey=YOUR-API-KEY&includeNutrition=true..

const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {


  // http://localhost:4000/api/users
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

    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&query=${searchTerm}`)
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

    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${pantryItems}`)
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // spoonacular test end point to search ingredient
  // http://localhost:4000/api/users/searchIngredient/banana
  // the first result is {"id":9040,"name":"banana","image":"bananas.jpg"}
  router.get("/searchIngredient/:ingredient", (req, res) => {

    let ingredient = req.params.ingredient;
    axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.API_KEY}&query=${ingredient}`)
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // gives you a snickers bar
  // http://localhost:4000/api/users/searchProductById/22347
  router.get("/searchProductById/:id", (req, res) => {

    let id = req.params.id;
    axios.get(`https://api.spoonacular.com/food/products/${id}?apiKey=${process.env.API_KEY}`)
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  // can take away "&amount=1" for less information on the item
  // http://localhost:4000/api/users/searchIngredientById/9266
  router.get("/searchIngredientById/:id", (req, res) => {

    // https://api.spoonacular.com/food/products/22347?
    let id = req.params.id;

    axios.get(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${process.env.API_KEY}&amount=1`)
      .then((response) => {
        res.send(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  });


  return router;
};
