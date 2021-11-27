import React, { useEffect, useState } from "react";
import axios from "axios";
import IngredientItem from "../components/IngredientItem";


export default function useIngredients(setList, list) {

  const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
  const [active, setActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState({});
  const [dropValue, setDropValue] = useState(false);

  // useEffect(() => {
  //   ingredientSearchResults.forEach((listedIngredient) => {
  //     if (listedIngredient.name === searchTerm) {
  //       console.log("listed ingredient", listedIngredient ,"Term", searchTerm)
  //       setActive(true)
  //     }
  //   })
  //   console.log("Active", active)
  // }, [ingredientSearchResults])

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
      
      // if the serch term exactly matches one of the ingredient items, we set active to true
      ingredientSearchResults.forEach((listedIngredient) => {
        if (listedIngredient.name === term) {
          if (listedIngredient.id) {
            axios.get(`/api/search/ingredientId/${listedIngredient.id}`)
            .then((result) => {
              console.log(result.data)
              setSearchTerm(result.data)
            })
            .catch((err) => {
              console.log(err)
            })
          }
        } 
      })
    })
    // .then((id) => {
    //   console.log("id", id)
    //   if (id) {
    //     axios.get(`/api/search/ingredientId/${id}`)
    //     .then((result) => {
    //       setSearchTerm(result.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //   }
    // })
  };



  const addPantryItem = () => {
    axios.post(`api/pantry/${searchTerm.id}`,{
      name: searchTerm.ingredientName, quantity: 44, measure: dropValue, imageLink: searchTerm.imageURL
    })
    .then((result)=>{
      console.log(result.data)
    })
  }

  return { dropValue, setDropValue, active, setActive, searchForIngredient, addPantryItem, ingredientSearchResults, searchTerm };
}