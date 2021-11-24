const formatMealDays = function (result) {

  let objectToHold = {};
  let arrayOfDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  let mealType = ["breakfast", "lunch", "dinner"];

  for (const day of arrayOfDays) {
    for (const meal of result) {
      for (const mealTime of mealType) {
        if (meal.day_of_week === day && meal.meal === mealTime) {
          objectToHold[day] = { ...objectToHold[day], [mealTime]: {} };
          objectToHold[day][mealTime] = {
            meal_list_id: meal.meal_list_id,
            spoonacular_id: meal.spoonacular_id,
            meal_name: meal.meal_name,
            image_link: meal.image_link,
          };
        };
      };
    };
  };

  return objectToHold;
}
exports.formatMealDays = formatMealDays;


const randomRecipes = function (maxNumber, amountToReturn) {

  let arrayOfNumbers = [];

  while (arrayOfNumbers.length < amountToReturn) {
    let number = Math.floor(Math.random() * maxNumber);

    if (!arrayOfNumbers.includes(number)) {
      arrayOfNumbers.push(number);
    }
  }

  return arrayOfNumbers;
}
exports.randomRecipes = randomRecipes;
