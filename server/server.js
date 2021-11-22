// load .env data into process.env
const environment = require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");

//cookie parser to get login id
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");

// add database query functions here
const { getUserById, getPantryItems, generateGroceryList, getRecipesByUser, getGroceryListByUser, editGroceryList, deleteGroceryList, getUserDetails, addGroceryListItem, deleteRecipesForUser, addRecipesForUser, deleteGroceryListItem, getPantryByUser, deletePantryItem, editPantryItem, addPantryItem, generateJoke } = require("./db/database");

const pool = new Pool(dbParams);
pool.connect();
const db = { getUserById, getPantryItems, generateGroceryList, getRecipesByUser, getGroceryListByUser, editGroceryList, deleteGroceryList, getUserDetails, addGroceryListItem, deleteRecipesForUser, addRecipesForUser, deleteGroceryListItem, getPantryByUser, deletePantryItem, editPantryItem, addPantryItem, generateJoke };

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");
const pantryRoutes = require("./routes/pantry");
const groceryList = require("./routes/groceryList");
const suggestions = require("./routes/suggestions");
const search = require("./routes/search");
const payment = require("./routes/payment");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/recipes", recipesRoutes(db));
app.use("/api/pantry", pantryRoutes(db));
app.use("/api/grocery_list", groceryList(db));
app.use("/api/suggestions", suggestions(db));
app.use("/api/search", search(db));
app.use("/api/payment", payment(db));

// Home page
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
