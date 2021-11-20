const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'final' //change back to midterm for testing
});


const getUserDetails = function (userId) {

  const sqlString = `SELECT * FROM users WHERE id = $1`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      if (res.rows.length === 0) {
        return null;
      }
      console.log(`Successfully retrieved information for user ${userId}.`)
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.getUserDetails = getUserDetails;


const getUserById = function () {

  // Test connect to db by changing the sqlString and comment out place holder db return

  // let userId = 1;
  // const sqlString = `SELECT * FROM users WHERE id = $1`;
  // return pool
  //   .query(sqlString, [userId])
  //   .then(res => {
  //     if (res.rows.length === 0) {
  //       return null;
  //     }
  //     return res.rows[0];
  //   })
  //   .catch(e => { console.error(e) });

  // PLACE HOLDER DB RETURN
  return new Promise((res, rej) => {
    return res("I'm a user!");
  }).catch(e => {
    console.error(e);
  });
}
exports.getUserById = getUserById;


const getPantryItems = function () {

  return new Promise((res, rej) => {
    return res(["banana", "apple", "orange"]);
  }).catch(e => {
    console.error(e);
  });
}
exports.getPantryItems = getPantryItems;


const saveGroceryList = function (ingredientObject, userId, week) {

  // EXPECTED OBJECT
  // let ingredientObject = {
  //   name: 'parmesan cheese',
  //   measures:
  //   {
  //     original: { amount: 0.25, unit: 'cup' },
  //     metric: { amount: 25, unit: 'g' },
  //     us: { amount: 0.9, unit: 'oz' }
  //   },
  //   pantryItem: false,
  //   aisle: 'Cheese',
  //   cost: 52.68,
  //   ingredientId: 1033
  // };

  const sqlString = `INSERT INTO grocery_list_items (user_id, item_name, quantity, measure, spoonacular_item_id, week) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  return pool
    .query(sqlString, [userId, ingredientObject.name, ingredientObject.measures.metric.amount, ingredientObject.measures.metric.unit, ingredientObject.ingredientId, week])
    .then(res => {
      console.log(`Successfully saved grocery list item ${ingredientObject.name} for user ${userId}.`);
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.saveGroceryList = saveGroceryList;


const getGroceryListByUser = function (userId) {

  const sqlString = `SELECT * FROM grocery_list_items WHERE user_id = $1;`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      console.log(`Successfully retrieved groceries by user ${userId}.`);
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getGroceryListByUser = getGroceryListByUser;


const editGroceryList = function (data) {

  const sqlString = `UPDATE grocery_list_items SET quantity = $1 WHERE user_id = $2 AND id = $3`;

  return pool
    .query(sqlString, [data.quantity, data.userId, data.groceryListId])
    .then(res => {
      console.log(`Successfully edited grocery entry ${data.groceryListId} for user ${data.userId}.`)
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.editGroceryList = editGroceryList;


const addGroceryListItem = function (data) {

  const sqlString = `INSERT INTO grocery_list_items (user_id, item_name, quantity, measure, week) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  return pool
    .query(sqlString, [data.userId, data.name, data.quantity, data.measure, data.week])
    .then(res => {
      console.log(`Successfully saved grocery list item ${data.name} for user ${data.userId}.`);
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.addGroceryListItem = addGroceryListItem;


const deleteGroceryList = function (userId, week) {

  const sqlString = `DELETE FROM grocery_list_items WHERE user_id = $1 AND week = $2`;

  return pool
    .query(sqlString, [userId, week])
    .then(res => {
      console.log(`Successfully deleted entire grocery list of user ${userId} to repopulate.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });

}
exports.deleteGroceryList = deleteGroceryList;


const getRecipesByUser = function (userId, week) {

  const sqlString = `SELECT spoonacular_id FROM meal_lists JOIN users ON user_id = users.id WHERE users.id = $1 AND week = $2`;

  return pool
    .query(sqlString, [userId, week])
    .then(res => {
      console.log(`Successfully retrieved recipes by user ${userId}.`);
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getRecipesByUser = getRecipesByUser;


const addRecipesForUser = function (data) {

  const sqlString = `INSERT INTO meal_lists (user_id, spoonacular_id, week, day_of_week, meal) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  return pool
    .query(sqlString, [data.userId, data.spoonacularId, data.week, data.day, data.meal])
    .then(res => {
      console.log(`Successfully added recipe ${data.spoonacularId} for user ${data.userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.addRecipesForUser = addRecipesForUser;


const deleteRecipesForUser = function (data) {

  const sqlString = `DELETE FROM meal_lists WHERE user_id = $1 AND week = $2 AND day_of_week = $3 AND meal = $4 AND spoonacular_id = $5`;

  return pool
    .query(sqlString, [data.userId, data.week, data.day, data.meal, data.spoonacularId])
    .then(res => {
      console.log(`Successfully deleted recipe of user ${data.userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteRecipesForUser = deleteRecipesForUser;

