import axios from 'axios';

export function searchForIngredient(term, ingredientSearchItem, setIngredientSearchItem) {

  axios.get(`/api/search/ingredientTerm`, {
    params: {
      searchTerm: term
    }
  })
  .then((result) => {
    //ingredientSearchResults = result.data.results
    setIngredientSearchItem(result.data.results);
  })
  
};