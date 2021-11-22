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


  // user requests to see their own grocery list
  // http://localhost:4000/api/suggestions/payment
  router.get("/payment", (req, res) => {

    let userId = 1; // const userId = req.cookies["user_id"];
    let cost = 0;
    let objectToSend = {};

    db.getGroceryListByUser(userId)
      .then((results) => {
        return results;
      })
      .then((results) => {

        let arrayOfItems = [];
        for (const item of results) {
          arrayOfItems.push(item.quantity + " " + item.measure + " " + item.item_name);
        }
        return arrayOfItems;
      })
      .then((arrayOfItems) => {

        axios({
          method: 'post',
          url: `https://api.spoonacular.com/mealplanner/shopping-list/compute?apiKey=${process.env.API_KEY}`,
          data: {
            "items": arrayOfItems // pass array of ingredients to be aggregated (type and weight)
          }
        })
          .then((results) => {

            let itemsToPay = [];
            cost = results.data.cost;

            for (const result of results.data["aisles"]) {
              // remove items from their aisles into one array
              itemsToPay = itemsToPay.concat(result["items"]);
            }

            for (const item of itemsToPay) {
              item.amount = item.measures.metric.amount;
              item.measure = item.measures.metric.unit;
              delete item.measures;
              delete item.pantryItem;
              delete item.aisle;
            }

            objectToSend.arrayOfItems = itemsToPay;
            objectToSend.priceTotal = cost;
            res.send(objectToSend);
            console.log("GET to /suggestions/payment - Success.");
          })

      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });
  return router;
};
