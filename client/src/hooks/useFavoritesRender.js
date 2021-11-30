import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useFavouritesRender(id, favStatus) {
  const [heart, setHeart] = useState(favStatus)
  const [render, setRender] = useState(0)

  const handleRender = () => {
    setRender(render => render + 1)
  }

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
        data:{spoonacularId: id}
      })
      .then(() => {
        setHeart(false)
      })
    }
  }

  return { heart, handleFavorite, render, setRender, handleRender };
};