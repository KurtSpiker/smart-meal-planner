import React, { Component } from "react";
import {
  Route,
  NavLink,
  BrowserRouter,
  Routes,
  Outlet,
  Link
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
 
class Main extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <h1>Smart Meal Planner</h1>
            <ul className="header">
              <li><NavLink to="/">Home</NavLink></li>
              <li><Link to="/stuff">Stuff</Link></li>
              <li><NavLink to="/contact">Contact</NavLink></li>
            </ul>
            <div className="content">
                <Routes>
                  <Route exact path="/" element={<Home/>}/>
                  <Route exact path="/stuff" element={<Stuff/>}/>
                  <Route exact path="/contact" element={<Contact/>}/>
                </Routes>
                <Outlet />
            </div>
          </div>
      </BrowserRouter>
    );
  }
}
 
export default Main;