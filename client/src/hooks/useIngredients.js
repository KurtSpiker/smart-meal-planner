import { useState } from "react";
import axios from "axios";

export default function useIngredients(setList, list) {

  const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState({});
  const [dropValue, setDropValue] = useState(false);
  const [measureValue, setMeasureValue] = useState("");

  const searchForIngredient = (term) => {
    axios.get(`/api/search/ingredientTerm`, {
      params: {
        searchTerm: term
      }
    })
      .then((result) => {
        //ingredientSearchResults = result.data.results
        setSearchTerm(term);
        setIngredientSearchResults(result.data.results);

        // if the serch term exactly matches one of the ingredient items
        //we make another api call to retrieve more ingredient information needed for the list item
        ingredientSearchResults.forEach((listedIngredient) => {
          if (listedIngredient.name === term) {
            if (listedIngredient.id) {
              axios.get(`/api/search/ingredientId/${listedIngredient.id}`)
                .then((result) => {
                  setSearchTerm(result.data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        })
      });
  };

  const addIngredientItem = (listName) => {
    axios.post(`api/${listName}/add/${searchTerm.id}`, {
      week: 1, name: searchTerm.ingredientName, quantity: measureValue, measure: dropValue, imageLink: searchTerm.imageURL
    })
      .then(() => {
        //resets the unit and measure/quantity values
        setDropValue(false);
        setMeasureValue("");
        setActive((prev) => !prev);
      });
  };

  return {
    measureValue,
    setMeasureValue,
    dropValue,
    setDropValue,
    active,
    setActive,
    searchForIngredient,
    addIngredientItem,
    ingredientSearchResults,
    searchTerm
  };
};