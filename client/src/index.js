import React from "react";
import ReactDOM from "react-dom";
import Main from "./components/Main";
import MealProvider from "./providers/MealProvider";
import "./index.css";
import "./importantStyles.css";

ReactDOM.render(
  <MealProvider>
    <Main />
  </MealProvider>,
  document.getElementById("root")
);
