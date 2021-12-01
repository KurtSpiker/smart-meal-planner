const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // logs in user and returns their information
  // http://localhost:4000/api/users/login/1
  router.get("/login/:id", (req, res) => {

    let idToSet = req.params.id[req.params.id.length - 1];
    console.log("THIS IS REQ DOT PARAMS", req.params.id)
    console.log("ID TO SET IS", idToSet)

    res.cookie('user_id', idToSet);
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
    console.log("Logged out user.")
    res.clearCookie('user_id');
    res.send("cleared cookie");
  })

  // user adds a favourite
  // http://localhost:4000/api/users/favourites
  router.post("/favourites", (req, res) => {

    const userId = req.cookies["user_id"];
    let spoonacularId = req.body.spoonacularId;

    console.log("THIS IS SPOONACULAR ID WHEN ADDING A FAVOURITE", req.body.spoonacularId)

    db.addFavourites(userId, spoonacularId)
      .then((results) => {
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  })


  // user deletes a favourite
  // http://localhost:4000/api/users/favourites
  router.delete("/favourites", (req, res) => {

    const userId = req.cookies["user_id"];
    let spoonacularId = req.body.spoonacularId;

    console.log("THIS IS SPOONACULAR ID WHEN DELETING A FAVOURITE", req.body.spoonacularId)

    console.log(spoonacularId)

    db.deleteFavourites(userId, spoonacularId)
      .then((results) => {
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
};
