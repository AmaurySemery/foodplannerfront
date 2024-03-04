import { useEffect, useState } from "react"
import FoodItem from "../interfaces/FoodItem"
import FoodCard from "../components/FoodCard"

const Page = () => {
  // Le ?populate=* permet d'accéder à la jointure
  // const foodListUrl = 'http://localhost:1337/api/foodlist?populate=*'
  const ownerEmail = localStorage.getItem('logged-in-user-email')
  const foodListUrl = `http://localhost:1337/api/foodlist?populate=*&filters[Email][$eq]=${ownerEmail}`
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
        foodCategory: item.attributes["food_category"].data.attributes.Name,
        maxStayInFreezerInMonth: item.attributes["food_category"].data.attributes.MaxStayInFreezer

      }
      return foodItem
    })
  }

  return (
    <>
    <h3>Food</h3>
    {foodList && foodList.map(item => (<FoodCard item={item} key={item.id} />))}
    </>
  )
}

export default Page