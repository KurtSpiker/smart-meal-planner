import React, { useState } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Outlet
} from "react-router-dom";
import WeekPlan from "./WeekPlan"
import Contact from "./Contact";
import LinkDrawer from "./LinkDrawer"
import GroceryList from "./GroceryList";
import PantryList from "./PantryList";
import RecipeSearch from "./RecipeSearch";

export default function Main() {

  // const [selectedMeal, setSelectedMeal] = useState({day: "", mealType: ""});
  
  return (
    <div>
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route exact path="/GroceryList" element={<GroceryList/>}/>
            <Route exact path="/WeekPlan" element={<WeekPlan />}/>
            <Route exact path="/PantryList" element={<PantryList/>}/>
            <Route exact path="/Recipe_search" element={<RecipeSearch/>}/>
          </Routes>
          <Outlet/>
        </div>
        <LinkDrawer>
        </LinkDrawer>
      </BrowserRouter>
    </div>
  );
};
