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
const { getUserById, getPantryItems } = require("./db/database");
const pool = new Pool(dbParams);
pool.connect();
const db = { getUserById, getPantryItems };

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const recipesRoutes = require("./routes/recipes")
const planRoutes = require("./routes/plan")

// Mount all resource routes
app.use("/api/users", usersRoutes(db));
app.use("/api/recipes", recipesRoutes(db));
app.use("/api/plan", planRoutes(db));


// Home page
app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
