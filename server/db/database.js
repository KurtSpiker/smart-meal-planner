const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'final' //change back to midterm for testing
});

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

const saveGroceryList = function (ingredientObject) {

  console.log("saveGroceryList called")

  let userId = 1;
  let meal_list_id = 1;

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

  const sqlString = `INSERT INTO grocery_list_items (meal_list_id, user_id, item_name, quantity, measure) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

  return pool
    .query(sqlString, [meal_list_id, userId, ingredientObject.name, ingredientObject.measures.metric.amount, ingredientObject.measures.metric.unit])
    .then(res => {
      console.log(res.rows[0]);
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.saveGroceryList = saveGroceryList;
