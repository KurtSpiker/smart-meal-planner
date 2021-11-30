import {
  Route,
  BrowserRouter,
  Routes,
  Outlet
} from "react-router-dom";
import WeekPlan from "./WeekPlan"
import LinkDrawer from "./LinkDrawer"
import GroceryList from "./GroceryList";
import PantryList from "./PantryList";
import RecipeSearch from "./RecipeSearch";
import Recipe from "./Recipe";
import Login from "./Login";
import Favourites from "./Favourites";
import AboutUs from "./AboutUs";
import Payment from "./Payment";


export default function Main() {

  return (
    <div>
      <BrowserRouter>
        <div className="content">
          <Routes>
            <Route exact path="/GroceryList" element={<GroceryList />} />
            <Route exact path="/WeekPlan" element={<WeekPlan />} />
            <Route exact path="/PantryList" element={<PantryList />} />
            <Route exact path="/Recipe_search" element={<RecipeSearch />} />
            <Route exact path="/Recipe" element={<Recipe />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Favourites" element={<Favourites />} />
            <Route exact path="/AboutUs" element={<AboutUs />} />.
            <Route exact path="/Payment" element={<Payment />} />.
          </Routes>
          <Outlet />
        </div>
        <LinkDrawer>
        </LinkDrawer>
      </BrowserRouter>
    </div>
  );
};
