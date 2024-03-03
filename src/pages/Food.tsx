import { useEffect, useState } from "react"

const Page = () => {
  // Le ?populate=* permet d'accéder à la jointure
  const foodListUrl = 'http://localhost:1337/api/foodlist?populate=*'
  const [foodList, setFoodList] = useState(null)
  useEffect(() => {
    const getFoodList = async () => {
      const res = await fetch(foodListUrl)
      const jsonData = await res.json()
      console.log({jsonData})
      setFoodList(jsonData)
    }
    getFoodList()
  }, [])

  return (
    <>
    <h3>Food</h3>
    {JSON.stringify(foodList)}
    </>
  )
}

export default Page