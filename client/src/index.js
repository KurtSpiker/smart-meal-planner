import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import MealProvider from "./providers/MealProvider";
import "./index.css";

ReactDOM.render(
  <MealProvider>
    <Main />
  </MealProvider>,
  document.getElementById("root")
);
