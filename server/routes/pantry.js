const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user wants to see their pantry and front end requests those items from server
  // http://localhost:4000/api/pantry
  router.get("/", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];

    db.getPantryByUser(userId)
      .then((results) => {
        console.log("GET to /pantry - Success.");
        res.send({ result: [...results], key: "pantry" });
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user edits their pantry
  // http://localhost:4000/api/pantry/edit/1077
  router.post("/edit/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    let data = { userId, spoonacularId, quantity: req.body.quantity };
    console.log(data);


    db.editPantryItem(data)
      .then((results) => {
        console.log("POST to /pantry/edit/:id - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  // user adds an item to their pantry
  // http://localhost:4000/api/pantry/9016
  router.post("/:id", (req, res) => {

    let spoonacularId = req.params.id;
    let userId = 1;


    let data = { userId, name: "apple juice", quantity: 500, measure: "ml", spoonacularId, imageLink: "apple-juice.jpg" };

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
  // http://localhost:4000/api/pantry/delete/12345
  router.delete("/delete/:id", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let spoonacularId = req.params.id;

    let data = { userId, spoonacularId };

    db.deletePantryItem(data)
      .then((results) => {
        console.log("DELETE to /pantry/:id - Success.");
        res.send(results);
        console
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};
