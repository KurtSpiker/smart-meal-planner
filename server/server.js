// load .env data into process.env
const environment = require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 4000;
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");

// add database query functions here
const { getUserById, getPantryItems, saveGroceryList } = require("./db/database");
const pool = new Pool(dbParams);
pool.connect();
const db = { getUserById, getPantryItems, saveGroceryList };

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes");
const planRoutes = require("./routes/plan");
const pantryRoutes = require("./routes/pantry");
const groceryList = require("./routes/groceryList");
const suggestions = require("./routes/suggestions");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/recipes", recipesRoutes(db));
app.use("/api/plan", planRoutes(db));
app.use("/api/pantry", pantryRoutes(db));
app.use("/api/grocery_list", groceryList(db));
app.use("/api/suggestions", suggestions(db));

// Home page
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
