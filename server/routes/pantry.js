const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user clicks on pantry and front end requests those items from server
  // http://localhost:4000/api/pantry/1
  router.get("/:id", (req, res) => {

    res.send("GET to http://localhost:4000/api/pantry/:id");

  });

  // user edits their pantry
  // http://localhost:4000/api/pantry/1/edit
  router.post("/:id/edit", (req, res) => {

    res.send("POST to http://localhost:4000/api/pantry/:id/edit");

  });

  // user adds an item to their pantry
  // http://localhost:4000/api/pantry/1
  router.post("/:id", (req, res) => {

    res.send("POST to http://localhost:4000/api/pantry/:id");

  });

  // user deletes an item off their pantry
  // http://localhost:4000/api/pantry/1/pantry_ingredient/9040
  router.delete("/:pantryId/pantry_ingredient/:ingredientId", (req, res) => {

    res.send("DELETE to http://localhost:4000/api/pantry/:pantryId/pantry_ingredient/:ingredientId/");

  });

  return router;
};
