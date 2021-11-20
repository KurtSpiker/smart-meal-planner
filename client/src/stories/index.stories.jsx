import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import DayMealsItem from '../components/DayMealsItem'
import DayMeals from '../components/DayMeals'
import Recipe from '../components/Recipe/'
import RecipeList from '../components/Recipe/RecipeList'
import RecipeListItem from '../components/Recipe/RecipeListItem'

storiesOf("DayMealsItem", module)
  .add("Base", () => <DayMealsItem />)

storiesOf("DayMeals", module)
  .add("Base", () => <DayMeals />)

storiesOf("Recipe", module)
  .add("Base", () => <Recipe />)
  .add("RecipeList", () => <RecipeList />)
  .add("RecipeListItem", () => <RecipeListItem />)
