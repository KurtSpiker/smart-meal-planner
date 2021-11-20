import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DayMealsItem from '../components/DayMealsItem'
import DayMeals from '../components/DayMeals'

storiesOf("DayMealsItem", module)
  .add("Base", () => <DayMealsItem />)

storiesOf("DayMeals", module)
  .add("Base", () => <DayMeals />)