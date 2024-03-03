import { useEffect, useState } from "react"
import FoodItem from "../interfaces/FoodItem"

const Page = () => {
  // Le ?populate=* permet d'accéder à la jointure
  const foodListUrl = 'http://localhost:1337/api/foodlist?populate=*'
  const [foodList, setFoodList] = useState<FoodItem[]>([])
  useEffect(() => {
    const getFoodList = async () => {
      const res = await fetch(foodListUrl)
      const jsonData = await res.json()
      console.log({jsonData})
      const parsedResult = foodItemsFormJson(jsonData.data)
      setFoodList(parsedResult)
    }
    getFoodList()
  }, [])

  function foodItemsFormJson(data: any[]): FoodItem[] {
    return data.map(item => {
      const foodItem: FoodItem = {
        id: item.id,
        name: item.attributes.Name,
        dateAdded: new Date(item.attributes.DateAdded),
        foodCategory: item.attributes["food_category"].data.attributes.name,
        maxStayInFreezerInMonth: item.attributes["food_category"].data.attributes.MaxStayInFreezer

      }
      return foodItem
    })
  }

  return (
    <>
    <h3>Food</h3>
    {JSON.stringify(foodList)}
    </>
  )
}

export default Page