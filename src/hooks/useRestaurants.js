import { useState, useEffect } from 'react'

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    fetch('/api/restaurant').then(res => res.json()).then(data => {
      if (data.error) return setRestaurants([])
      setRestaurants(data.businesses)
    })
  }, [])

  const searchRestaurants = (location, term) => {
    if (location === '' && term === '') {
      fetch('/api/restaurant').then(res => res.json()).then(data => {
        if (data.error) return setRestaurants([])
        setRestaurants(data.businesses)
      })
    } else {
      fetch(`/api/restaurant?term=${term}&location=${location}`).then(res => res.json()).then(data => {
        if (data.error) return setRestaurants([])
        setRestaurants(data.businesses)
      })
    }
  }

  const getRestaurant = async (id) => {
    const resData = await fetch(`/api/restaurant/${id}`)
    const data = await resData.json()
    return data
  }

  return {
    restaurants,
    searchRestaurants,
    getRestaurant
  }
}

export default useRestaurants
