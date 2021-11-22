import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { recipe } from '../sampleRecipe'

import DayMealsItem from '../components/DayMealsItem'
import DayMeals from '../components/DayMeals'
import Recipe from '../components/Recipe/'
import RecipeList from '../components/Recipe/RecipeList'
import RecipeListItem from '../components/Recipe/RecipeListItem'
import GroceryList from '../components/GroceryList'
import PantryList from '../components/PantryList'
import IngredientList from '../components/IngredientList'
import IngredientItem from '../components/IngredientItem'
import Counter from '../components/Counter'

const recipeItems = ["tomatoes", "onions", "carrots"]

storiesOf("DayMealsItem", module)
  .add("Base", () => <DayMealsItem />)

storiesOf("DayMeals", module)
  .add("Base", () => <DayMeals />)

storiesOf("Recipe", module)
  .add("Base", () => <Recipe />)
  .add("RecipeList", () => <RecipeList recipeItems={recipeItems} />)
  .add("RecipeListItem", () => <RecipeListItem ingredientItem={"carrots"}/>)
storiesOf("GroceryList", module)
  .add("Base", () => <GroceryList />)
  .add("IngredientList", () => <IngredientList />)
  .add("IngredientItem", () => <IngredientItem />)
  .add("Counter", () => <Counter />)

storiesOf("PantryList", module)
  .add("Base", () => <PantryList />)
