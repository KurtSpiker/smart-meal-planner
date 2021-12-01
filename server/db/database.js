const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME
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


const generateGroceryList = function (ingredientObject, userId, week, ingredientsToValidate, ingredientsToConvert) {

  const sqlString = `INSERT INTO grocery_list_items (user_id, item_name, quantity, measure, spoonacular_ingredient_id, week, image_link, auto_generated) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

  let amount = ingredientObject.measures.metric.amount;
  let measure = ingredientObject.measures.metric.unit;

  // if ingredientObject's id is inside ingredients convert (they also have it in their pantry)
  if (ingredientsToConvert.includes(ingredientObject.ingredientId)) {
    // set amount and unit of measure from the ingredientToValidate obj, unless it is negative
    console.log("ingredients to convert", ingredientsToConvert)
    console.log("ingrdeintsToValidate", ingredientsToValidate)
    console.log("INSPECTING ID", ingredientObject.ingredientId)
    if (ingredientsToValidate[ingredientObject.ingredientId].resultingSubtraction <= 0) {
      return;
    }
    // console.log("INGREDIENTS LIST TO VALIDATE", ingredientsToValidate);
    amount = ingredientsToValidate[ingredientObject.ingredientId].resultingSubtraction;
    measure = ingredientsToValidate[ingredientObject.ingredientId].pantryMeasure;
  }

  return pool
    .query(sqlString, [userId, ingredientObject.name, amount, measure, ingredientObject.ingredientId, week, ingredientObject.imageUrl, true])
    .then(res => {
      console.log(`Successfully generated grocery list item ${ingredientObject.name} for ingredient ${ingredientObject.ingredientId} ${ingredientObject.name}.`);
      return res.rows[0];
    })
    .catch(e => { console.error(e) });

}
exports.generateGroceryList = generateGroceryList;



const getGroceryListByUser = function (userId, week) {

  const sqlString = `SELECT * FROM grocery_list_items WHERE user_id = $1 AND week = $2 ORDER BY item_name;`;

  return pool
    .query(sqlString, [userId, week])
    .then(res => {
      console.log(`Successfully retrieved groceries by user ${userId}.`);
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getGroceryListByUser = getGroceryListByUser;



const editGroceryList = function (data) {

  // EXPECTED DATA OBJECT
  // data = { userId: 1, name: "some stuff i named", quantity: 10, measure: "ml", week: 1, week: 1 };

  let sqlString = `UPDATE grocery_list_items SET `;
  let counter = 0;
  let sqlStringArray = [];
  let arrayToPass = [];

  if (data.name) {
    counter++;
    sqlStringArray.push(`item_name = $${counter}`);
    arrayToPass.push(data.name);
  }

  if (data.quantity) {
    counter++;
    sqlStringArray.push(`quantity = $${counter}`);
    arrayToPass.push(data.quantity);
  }

  if (data.measure) {
    counter++;
    sqlStringArray.push(`measure = $${counter}`);
    arrayToPass.push(data.measure);
  }

  sqlString = sqlString + sqlStringArray.join(", ");

  counter++;
  sqlString = sqlString + ` WHERE user_id = $${counter} `;
  arrayToPass.push(data.userId);

  counter++;
  sqlString = sqlString + ` AND spoonacular_ingredient_id = $${counter}`;
  arrayToPass.push(data.spoonacularId);

  counter++;
  sqlString = sqlString + ` AND week = $${counter}`;
  arrayToPass.push(data.week);

  return pool
    .query(sqlString, arrayToPass)
    .then(res => {
      console.log(`Successfully edited grocery entry ${data.spoonacularId} for user ${data.userId}.`)
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.editGroceryList = editGroceryList;



const addGroceryListItem = function (data) {

  let sqlString = `INSERT INTO grocery_list_items (user_id, item_name, quantity, week, image_link, spoonacular_ingredient_id `;
  let sqlStringArray = [data.userId, data.name, data.quantity, data.week, data.imageLink, data.spoonacularId];

  if (data.measure) {
    sqlString = sqlString + `, measure) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    sqlStringArray.push(data.measure);
  } else {
    sqlString = sqlString + `) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
  }

  return pool
    .query(sqlString, sqlStringArray)
    .then(res => {
      console.log(`Successfully saved grocery list item ${data.name} for user ${data.userId}.`);
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.addGroceryListItem = addGroceryListItem;



const deleteGroceryList = function (userId, week) {

  const sqlString = `DELETE FROM grocery_list_items WHERE user_id = $1 AND week = $2 AND auto_generated = $3`;

  return pool
    .query(sqlString, [userId, week, true])
    .then(res => {
      console.log(`Successfully deleted pregenerated grocery list for user ${userId} to repopulate.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteGroceryList = deleteGroceryList;



const deleteGroceryListItem = function (data) {

  const sqlString = `DELETE FROM grocery_list_items WHERE user_id = $1 AND spoonacular_ingredient_id = $2 AND week = $3`;

  return pool
    .query(sqlString, [data.userId, data.spoonacularId, data.week])
    .then(res => {
      console.log(`Successfully deleted grocery list item for user ${data.userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteGroceryListItem = deleteGroceryListItem;



const getRecipesByUser = function (userId, week) {

  const sqlString = `SELECT meal_name, meal_lists.id AS meal_list_id, day_of_week, user_id, spoonacular_id, meal, week, image_link FROM meal_lists JOIN users ON user_id = users.id WHERE users.id = $1 AND week = $2 ORDER BY meal_name`;

  return pool
    .query(sqlString, [userId, week])
    .then(res => {
      console.log(`Successfully retrieved recipes for user ${userId}.`);
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getRecipesByUser = getRecipesByUser;




const addRecipesForUser = function (data) {

  // data = { userId, week: 1, day: "tuesday", meal: "lunch", spoonacularId, mealName: "Delicious Meal", imageUrl: 'https://spoonacular.com/recipeImages/633876-556x370.jpg' };

  const sqlString = `INSERT INTO meal_lists (user_id, spoonacular_id, week, day_of_week, meal, meal_name, image_link) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

  return pool
    .query(sqlString, [data.userId, data.spoonacularId, data.week, data.day.toLowerCase(), data.meal.toLowerCase(), data.mealName, data.imageUrl])
    .then(res => {
      console.log(`Successfully added recipe ${data.spoonacularId} for user ${data.userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.addRecipesForUser = addRecipesForUser;



const deleteRecipesForUser = function (data) {

  const sqlString = `DELETE FROM meal_lists WHERE user_id = $1 AND week = $2 AND day_of_week = $3 AND meal = $4`;

  return pool
    .query(sqlString, [data.userId, data.week, data.day.toLowerCase(), data.meal])
    .then(res => {
      console.log(`Successfully deleted recipe of user ${data.userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteRecipesForUser = deleteRecipesForUser;



const getPantryByUser = function (userId) {

  const sqlString = `SELECT * FROM pantry_ingredients WHERE user_id = $1 ORDER BY item_name`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      console.log(`Successfully retrieved pantry items for user ${userId}.`);
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getPantryByUser = getPantryByUser;



const deletePantryItem = function (data) {

  const sqlString = `DELETE FROM pantry_ingredients WHERE user_id = $1 AND spoonacular_ingredient_id = $2`;

  return pool
    .query(sqlString, [data.userId, data.spoonacularId])
    .then(res => {
      console.log(`Successfully deleted pantry item for user ${data.userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deletePantryItem = deletePantryItem;



const addPantryItem = function (data) {

  // EXPECT DATA OBJECT
  // data = { userId, name: "apple juice", quantity: 500, measure: "ml", spoonacularId, imageLink: "apple-juice.jpg" };

  const sqlString = `INSERT INTO pantry_ingredients (user_id, item_name, quantity, measure, spoonacular_ingredient_id, image_link) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;

  return pool
    .query(sqlString, [data.userId, data.name, data.quantity, data.measure, data.spoonacularId, data.imageLink])
    .then(res => {
      console.log(`Successfully saved grocery list item ${data.name} for user ${data.userId}.`);
      return res.rows[0];
    })
    .catch(e => { console.error(e) });
}
exports.addPantryItem = addPantryItem;



const editPantryItem = function (data) {

  // EXPECTING OBJECT
  // let data = { userId: 1, itemDbId: 1, name: "apple juice", quantity: 500, measure: "ml" };

  let sqlString = `UPDATE pantry_ingredients SET `;
  let counter = 0;
  let sqlStringArray = [];
  let arrayToPass = [];

  if (data.name) {
    counter++;
    sqlStringArray.push(`item_name = $${counter}`);
    arrayToPass.push(data.name);
  }
  if (data.quantity) {
    counter++;
    sqlStringArray.push(`quantity = $${counter}`);
    arrayToPass.push(data.quantity);
  }

  if (data.measure) {
    counter++;
    sqlStringArray.push(`measure = $${counter}`);
    arrayToPass.push(data.measure);
  }

  sqlString = sqlString + sqlStringArray.join(", ");

  counter++;
  sqlString = sqlString + ` WHERE user_id = $${counter} `;
  arrayToPass.push(data.userId);

  counter++;
  sqlString = sqlString + ` AND spoonacular_ingredient_id = $${counter}`;
  arrayToPass.push(data.spoonacularId);

  return pool
    .query(sqlString, arrayToPass)
    .then(res => {
      console.log(`Successfully edited pantry item entry ${data.spoonacularId} for user ${data.userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.editPantryItem = editPantryItem;



const generateJoke = function (number) {

  const sqlString = `SELECT joke FROM jokes WHERE id = $1`;

  return pool
    .query(sqlString, [number])
    .then(res => {
      console.log(`Successfully generated joke.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.generateJoke = generateJoke;



const getFavourites = function (userId) {

  const sqlString = `SELECT * FROM favourites WHERE user_id = $1 ORDER BY spoonacular_id;`;

  return pool
    .query(sqlString, [userId])
    .then(res => {
      console.log(`Successfully retrieved favourites for user ${userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.getFavourites = getFavourites;



const addFavourites = function (userId, spoonacularId) {

  let sqlString = `INSERT INTO favourites (user_id, spoonacular_id) VALUES ($1, $2)`;

  return pool
    .query(sqlString, [userId, spoonacularId])
    .then(res => {
      console.log(`Successfully added favourites for user ${userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.addFavourites = addFavourites;



const deleteFavourites = function (userId, spoonacularId) {

  let sqlString = `DELETE FROM favourites WHERE user_id = $1 AND spoonacular_id = $2`;

  return pool
    .query(sqlString, [userId, spoonacularId])
    .then(res => {
      console.log(`Successfully added favourites for user ${userId}.`)
      return res.rows;
    })
    .catch(e => { console.error(e) });
}
exports.deleteFavourites = deleteFavourites;
