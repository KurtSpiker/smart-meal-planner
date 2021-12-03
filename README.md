# Fork it Over

Fork it over is a meal planning application that helps users plan out their weekly meal schedule and grocery shopping. The application is made up of 5 core features:

  - Weekly Plan: A weekly calendar to keep track of meals you plan to eat on a given week
  - Search: A search function that allows users to look for recipes via the Spoonacular API
  - Pantry List: List to keep track of ingredients you have on hand. Ingredients correspond to those available on Spoonacular. 
  - Grocery List: Auto generated list based on your weekly meal plan and your pantry items. 
  - Favourites: A page to view your favourited recipes

## Getting Started

For anyone who wants to download and tinker with Fork it over, please fork and clone this respository to your local computer. 

### Database Setup

Fort it over uses a PostgreSQL database. Users are free to set up the database how they choose as long as they make the appropriate adjustments to their .env file (See .env.example). We used the following comands:

1. `$ psql`
2. `CREATE DATABASE final OWNER labber`
3. `\c final -U labber`
4. `\i db/schema/main_schema.sql`
5. `\i db/seeds/main_seed.sql`

In  a new tab:

6. `$ cd server`
7. `$ npm start`

### Running the React App

1. Enter the client directory with `cd client` from the root of the project folder
2. Install dependencies with `yarn install`
3. Update the proxy in the package.json file to match the port number of your local database
3. `$ yarn start`

** Note: to access any of the recipe information you will need to register for a Spoonacular API key and add it to the .env file **

## Screenshots

### Front-End Dependencies
- @emotion/react: ^11.6.0,
- @emotion/styled: ^11.6.0,
- @mui/icons-material: ^5.1.1,
- @mui/material: ^5.1.1,
- @mui/styles: ^5.2.1,
- @testing-library/jest-dom: ^5.11.4,
- @testing-library/react: ^11.1.0,
- @testing-library/user-event: ^12.1.10,
- axios: ^0.24.0,
- cookie-parser: ^1.4.6,
- qs: ^6.10.1,
- react: ^17.0.2,
- react-cookie: ^4.1.1,
- react-dom: ^17.0.2,
- react-number-format: ^4.8.0,
- react-router-dom: ^6.0.2,
- react-scripts: 4.0.3,
- web-vitals: ^1.0.1

### Back-End Dependencies
- axios: ^0.23.0,
- chalk: ^2.4.2,
- cookie-parser: ^1.4.5,
- cors: ^2.8.5,
- dotenv: ^2.0.0,
- ejs: ^2.6.2,
- express: ^4.17.1,
- morgan: ^1.9.1,
- pg: ^8.5.0,
- pg-native: ^3.0.0,
- sass: ^1.35.1,
- qs: ^6.10.1