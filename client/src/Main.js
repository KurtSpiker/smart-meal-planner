import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
  Outlet
} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import LinkDrawer from "./LinkDrawer"
class Main extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="content">
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/stuff" element={<Stuff/>}/>
              <Route exact path="/contact" element={<Contact/>}/>
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