import { createContext, useState } from 'react';

export const mealContext = createContext();

export default function MealProvider(props) {

  const [dayOfWeek, setDayOfWeek] = useState("");
  const [typeOfMeal, setTypeOfMeal] = useState("");
  const [weekNumber, setWeekNumber] = useState(1)

  const setDayInformation = (day, type) => {
    setDayOfWeek(day)
    setTypeOfMeal(type)
  }

  const mealData = { dayOfWeek, typeOfMeal, setDayInformation, weekNumber };

  return (
    <mealContext.Provider value={mealData}>
      {props.children}
    </mealContext.Provider>
  );
};