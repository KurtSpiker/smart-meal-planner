const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user requests to see their own grocery list
  // http://localhost:4000/api/grocery_list/:id
  router.get("/:id", (req, res) => {

    res.send("GET to http://localhost:4000/api/grocery_list/:id");

  });

  // user edits their grocery list
  // http://localhost:4000/api/grocery_list/:id/edit
  router.post("/:id/edit", (req, res) => {

    res.send("POST to http://localhost:4000/api/grocery_list/:id/edit");

  });

  // user makes a new grocery list? or add items in?
  // http://localhost:4000/api/grocery_list/1
  router.post("/:id", (req, res) => {

    res.send("POST to http://localhost:4000/api/grocery_list/:id");

  });

  return router;
};
