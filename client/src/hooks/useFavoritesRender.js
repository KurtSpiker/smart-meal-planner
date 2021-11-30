import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useFavouritesRender(id, favStatus) {
  const [heart, setHeart] = useState(favStatus)

  const handleFavorite = () => {
    if (!favStatus) {
      axios({
        method: 'post',
        url: `/api/users/favourites`,
        data: {
          "spoonacularId": id
        }
      })
        .then(() => {
          setHeart(true)
        })
    } else {
      axios.delete(`/api/users/favourites`, {
        data: { spoonacularId: id }
      })
        .then(() => {
          setHeart(false)
        })
    }
  }

  return { heart, handleFavorite };
};