import React from "react";
import { storiesOf } from "@storybook/react";
import { recipe } from '../sampleRecipe'
import { weekRecipes } from "../sampleWeekRecipes";

import Show from '../components/WeekPlan/Show'
import Load from '../components/WeekPlan/Load'
import Add from '../components/WeekPlan/Add'
import Confirm from '../components/WeekPlan/Confirm'
import DayMeals from '../components/WeekPlan/DayMeals'
import WeekPlan from '../components/WeekPlan/index'
import Recipe from '../components/Recipe/'
import RecipeIngredientsList from '../components/Recipe/RecipeIngredientsList'
import ListItem from '../components/Recipe/ListItem'
import GroceryList from '../components/GroceryList'
import PantryList from '../components/PantryList'
import IngredientList from '../components/IngredientList'
import IngredientItem from '../components/IngredientItem'
import Counter from '../components/Counter'

const recipeItems = recipe.ingredientArray

storiesOf("WeekPlan", module)
  .add("Base", () => <WeekPlan />)
  .add("DayMeals", () => <DayMeals meals={weekRecipes.monday} dayOfWeek="Monday"/>)
  .add("Show", () => <Show meal={weekRecipes.monday.breakfast} mealType={"breakfast"}/>)
  .add("Load", () => <Load />)
  .add("Add", () => <Add />)
  .add("Confirm", () => <Confirm />)

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
