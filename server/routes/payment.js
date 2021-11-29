const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {

  // user presses order button and this generates prices
  // http://localhost:4000/api/payment
  router.get("/", (req, res) => {

    const userId = req.cookies["user_id"];
    let cost = 0;
    let objectToSend = {};

    db.getGroceryListByUser(userId)
      .then((results) => {

        let arrayOfItems = [];
        for (const item of results) {
          arrayOfItems.push(item.quantity + " " + item.measure + " " + item.item_name);
        }
        return arrayOfItems;
      })
      .then((arrayOfItems) => {

        return axios({
          method: 'post',
          url: `https://api.spoonacular.com/mealplanner/shopping-list/compute?apiKey=${process.env.API_KEY}`,
          data: {
            "items": arrayOfItems // pass array of ingredients to be aggregated (type and weight)
          }
        });
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

          let newCost = item.cost / 100;
          item.cost = newCost;

          delete item.measures;
          delete item.pantryItem;
          delete item.aisle;
        }

        objectToSend.arrayOfItems = itemsToPay;
        objectToSend.priceTotal = cost / 100;

        res.send(objectToSend);
        console.log("GET to /payment - Success.");
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });
  return router;
};
