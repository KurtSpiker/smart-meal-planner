const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // ranking ->	Whether to maximize used ingredients (1) or minimize missing ingredients (2) first.
  // display -> The maximum number of recipes to return (between 1 and 100). Defaults to 10.
  // ignorePantry -> 	Whether to ignore typical pantry items, such as water, salt, flour, etc.

  // https://api.spoonacular.com/recipes/findByIngredients?apiKey=3cb5c5c2b8a042d9b6818458a9ad1bbc&ingredients=apples,flour,sugar&number=2
  // frontend -> server -> api for suggested recipes based on pantry
  // http://localhost:4000/api/suggestions
  router.get("/", (req, res) => {

    // get data from front end
    let data = { numberToDisplay: 10, ignorePantry: true, ranking: 1 }
    let userId = 1;

    // get pantry items from db
    let pantryArray = [];
    let numberToDisplay = `&number=${data.numberToDisplay}`;
    let ignorePantry = `&ignorePantry=${data.ignorePantry}`;
    let ranking = `&ranking=${data.ranking}`;

    db.getPantryByUser(userId)
      .then((results) => {
        for (const pantryItem of results) {
          pantryArray.push(pantryItem.item_name)
        }

        axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${pantryArray.join(",")}${numberToDisplay}${ignorePantry}${ranking}`)
          .then((response) => {
            res.send(response.data);
            console.log("GET to /suggestions - Success.");
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  // generates a random food joke. this is my greatest creation.
  // http://localhost:4000/api/suggestions/joke
  router.get("/joke", (req, res) => {

    let number = Math.floor(Math.random() * 57 + 1);

    db.generateJoke(number)
      .then((results) => {
        console.log("GET to /suggestions/joke - Success.");
        res.send(results);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });

  });

  return router;
};
