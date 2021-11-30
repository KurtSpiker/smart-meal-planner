import { createContext, useState } from 'react';

export const mealContext = createContext();

export default function MealProvider(props) {

  const [dayOfWeek, setDayOfWeek] = useState("");
  const [typeOfMeal, setTypeOfMeal] = useState("");
  const [weekNumber, setWeekNumber] = useState(1)
  const [mealId, setMealId] = useState(null)
  const [cookie, setCookie] = useState(false)

  const setDayInformation = (day, type, id) => {
    setDayOfWeek(day)
    setTypeOfMeal(type)
    setMealId(id)
  }

  const mealData = { dayOfWeek, typeOfMeal, setDayInformation, weekNumber, mealId, setCookie, cookie };

  return (
    <mealContext.Provider value={mealData}>
      {props.children}
    </mealContext.Provider>
  );
};