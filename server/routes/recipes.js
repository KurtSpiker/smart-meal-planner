const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // search for a recipe using keywords
  // http://localhost:4000/api/recipes
  router.get("/", (req, res) => {

    res.send("GET to http://localhost:4000/api/recipes");

  });


  // searching for a specific recipe using its spoonacular id
  // http://localhost:4000/api/recipes/648279
  router.get("/:id", (req, res) => {

    res.send("GET to http://localhost:4000/api/recipes/:id");

  });


  return router;
};
