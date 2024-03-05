import { useEffect, useState } from "react"
import FoodItem from "../interfaces/FoodItem"
import FoodCard from "../components/FoodCard"
import { useNavigate } from "react-router-dom"

const Page = () => {
  // Le ?populate=* permet d'accéder à la jointure
  // const foodListUrl = 'http://localhost:1337/api/foodlist?populate=*'
  const navigate = useNavigate()
  const anonymous = 'ano@t.fr'
  const ownerEmail = localStorage.getItem('logged-in-user-email') || anonymous
  const foodListUrl = `http://localhost:1337/api/foodlist?populate=*&filters[Email][$eq]=${ownerEmail}`
  const [foodList, setFoodList] = useState<FoodItem[]>([])
  useEffect(() => {
    if (ownerEmail === anonymous) {
      navigate('/login')
    }
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
        foodCategory: item.attributes.foodcategory.data.attributes.Name,
        maxStayInFreezerInMonth: item.attributes.foodcategory.data.attributes.MaxStayInFreezer

      }
      return foodItem
    })
  }

  async function handleDelete(id:string) {
    const strapiFoodDeleteUrl = `http://localhost:1337/api/foodlist/${id}`
    const deleteRes = await fetch(strapiFoodDeleteUrl, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json'
      }
    })
    const jsonDeleteRes = await deleteRes.json()
    console.log({ jsonDeleteRes })
  }

  return (
    <>
    <h3>Food</h3>
    {foodList && foodList.map(item => (<FoodCard item={item} key={item.id} deleteItem={handleDelete} />))}
    </>
  )
}

export default Page