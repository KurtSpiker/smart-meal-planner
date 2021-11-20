const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user clicks on pantry and front end requests those items from server
  // http://localhost:4000/api/pantry/1
  router.get("/:id", (req, res) => {

    let userId = req.params.id;

    db.getPantryByUser(userId)
      .then((results) => {
        console.log("GET to /pantry/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user edits their pantry
  // http://localhost:4000/api/pantry/1/edit
  router.post("/:id/edit", (req, res) => {

    let data = { userId: req.params.id, itemDbId: 1, name: "apple juice", quantity: 121 };

    db.editPantryItem(data)
      .then((results) => {
        console.log("POST to /pantry/:id/edit - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user adds an item to their pantry
  // http://localhost:4000/api/pantry/1 [data.userId, data.name, data.quantity, data.measure])
  router.post("/:id", (req, res) => {

    let data = { userId: req.params.id, name: "apple juice", quantity: 500, measure: "ml" };

    db.addPantryItem(data)
      .then((results) => {
        console.log("POST to /pantry/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user deletes an item off their pantry
  // http://localhost:4000/api/pantry/1
  router.delete("/:id", (req, res) => {

    let data = { userId: req.params.id, itemDbId: 1 };

    db.deletePantryItem(data)
      .then((results) => {
        console.log("DELETE to /pantry/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  return router;
};
