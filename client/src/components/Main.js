import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Outlet
} from "react-router-dom";
import DayMeals from "./DayMeals"
import Contact from "./Contact";
import LinkDrawer from "./LinkDrawer"
import GroceryList from "./GroceryList";
import PantryList from "./PantryList";
import Recipe from "./Recipe/index";
import RecipeSearch from "./RecipeSearch";
class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="content">
            <Routes>
              <Route exact path="/GroceryList" element={<GroceryList/>}/>
              <Route exact path="/DayMeals" element={<DayMeals/>}/>
              <Route exact path="/PantryList" element={<PantryList/>}/>
              <Route exact path="/Test" element={<Recipe/>}/>
              <Route exact path="/Recipe_search" element={<RecipeSearch/>}/>
            </Routes>
            <Outlet/>
          </div>
          <LinkDrawer>
          </LinkDrawer>
        </BrowserRouter>
      </div>
    );
  }
}
 
export default Main;