const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // frontend -> server -> for suggested recipes
  // http://localhost:4000/api/suggestions
  router.get("/", (req, res) => {

    res.send("GET to http://localhost:4000/api/suggestions");

  });

  return router;
};
