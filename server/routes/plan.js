const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user clicks on their plan and front end requests this end point
  // http://localhost:4000/api/plan/1
  router.get("/:id", (req, res) => {

    res.send("GET to  http://localhost:4000/api/plan/:id")

  });

  // user creates a new plan
  // http://localhost:4000/api/plan/1
  router.post("/:id", (req, res) => {

    res.send("POST to  http://localhost:4000/api/plan/:id");

  });

  // user edits their plan
  // http://localhost:4000/api/plan/1/edit
  router.post("/:id/edit", (req, res) => {

    res.send("POST to  http://localhost:4000/api/plan/:id/edit");

  });

  // user adds a specific recipe to their specific plan
  // http://localhost:4000/api/plan/1/recipe/648279
  router.post("/:planId/recipe/:recipeId", (req, res) => {

    res.send("POST to  http://localhost:4000/api/plan/:planId/recipe/:recipeId");
    
  });

  // user delete a specific recipe from their specific plan
  // http://localhost:4000/api/plan/1/recipe/648279
  router.delete("/:planId/recipe/:recipeId", (req, res) => {

    res.send("DELETE to  http://localhost:4000/api/plan/:planId/recipe/:recipeId");

  });

  return router;
};
