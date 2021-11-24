import { createContext, useState } from 'react';

export const mealContext = createContext();

export default function MealProvider(props) {

  const [dayOfWeek, setDayOfWeek] = useState("");
  const [typeOfMeal, setTypeOfMeal] = useState("");

  const setDayInformation = (day, type) => {
    setDayOfWeek(day)
    setTypeOfMeal(type)
  }

  const mealData = { dayOfWeek, typeOfMeal, setDayInformation };

  return (
    <mealContext.Provider value={mealData}>
      {props.children}
    </mealContext.Provider>
  );
};