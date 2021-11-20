//THIS IS JUST A TEST ROUTE

// Attention: Only the first query parameter is prefixed with a ? (question mark), all subsequent ones will be prefixed with a & (ampersand). That is
// how URLs work and nothing related to our API. Here's a full example with two parameters apiKey and includeNutrition:
// https://api.spoonacular.com/recipes/716429/information?apiKey=YOUR-API-KEY&includeNutrition=true..

const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // ROUTE TO TEST DATABASE LINK
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

  //------------------------------------------------------------------------------------------------
  // logs in user and returns their information
  // http://localhost:4000/api/users/login/1
  router.get("/login/:id", (req, res) => {

    res.cookie('user_id', req.params.id);
    const userId = req.cookies["user_id"];

    db.getUserDetails(userId)
      .then((userDetails) => {
        console.log("GET to users/login/:id - Success.");
        res.send(userDetails);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  // logs out user
  // http://localhost:4000/api/users/logout
  router.get("/logout", (req, res) => {
    res.clearCookie('user_id');
    res.send("cleared cookie");
  })
  //---------------------------------------------------------------------------------------------------

  // spoonacular test end point to search recipes with keywords
  // http://localhost:4000/api/users/searchRecipes/italian
  // first recipe is {"id":648279,"title":"Italian Tuna Pasta","image":"https://spoonacular.com/recipeImages/648279-312x231.jpg","imageType":"jpg"}
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

  // https://api.spoonacular.com/recipes/1123/ingredientWidget.json?apiKey=${process.env.API_KEY}
  // https://api.spoonacular.com/recipes/{id}/ingredientWidget.json?apiKey=181eb90a525e42168305cbc5312e50d2
  // http://localhost:4000/api/users/searchIngredient/1123/measure/
  router.get("/searchIngredient/:id/measure", (req, res) => {

    let id = req.params.id;

    axios.get(`https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.API_KEY}`)
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

  // takes in a pantry and returns the ids of those items
  http://localhost:4000/api/users/searchPantry
  router.get("/searchPantry", (req, res) => {

    db.getPantryItems()
      .then((pantry) => {

        let ingredientIds = "";

        axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.API_KEY}&query=${pantry[0]}`)
          .then((response) => {
            console.log(response.data.results[0]);
            ingredientIds = response.data.results[0].id;
          })
          .catch((error) => {
            console.log(error);
          });

        return ingredientIds;
      })
      .then((results) => {
        res.send(results)
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
