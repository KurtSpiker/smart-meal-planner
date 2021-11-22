import React from "react";
import { storiesOf } from "@storybook/react";
import { recipe } from '../sampleRecipe'

import DayMealsItem from '../components/WeekPlan/DayMealsItem'
import DayMeals from '../components/WeekPlan/DayMeals'
import WeekPlan from '../components/WeekPlan/index.js'
import Recipe from '../components/Recipe/'
import RecipeIngredientsList from '../components/Recipe/RecipeIngredientsList'
import ListItem from '../components/Recipe/ListItem'
import GroceryList from '../components/GroceryList'
import PantryList from '../components/PantryList'
import IngredientList from '../components/IngredientList'
import IngredientItem from '../components/IngredientItem'
import Counter from '../components/Counter'

const recipeItems = recipe.ingredientArray

storiesOf("WeekMeals", module)
  .add("Base", () => <WeekPlan />)
  .add("DayMeals", () => <DayMeals />)
  .add("DayMealsItem", () => <DayMealsItem />)

storiesOf("Recipe", module)
  .add("Base", () => <Recipe />)
  .add("RecipeIngredientList", () => <RecipeIngredientsList recipeItems={recipeItems} />)
  .add("ListItem", () => <ListItem ingredientItem={"carrots"}/>)

  storiesOf("GroceryList", module)
  .add("Base", () => <GroceryList />)
  .add("IngredientList", () => <IngredientList />)
  .add("IngredientItem", () => <IngredientItem />)
  .add("Counter", () => <Counter />)

storiesOf("PantryList", module)
  .add("Base", () => <PantryList />)
