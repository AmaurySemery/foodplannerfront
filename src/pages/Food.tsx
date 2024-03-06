import { useEffect, useState } from "react"
import FoodItem from "../interfaces/FoodItem"
import FoodCard from "../components/FoodCard"
import { useNavigate } from "react-router-dom"
import OrderBy from "../components/OrderBy"
import { add, compareAsc } from "date-fns"

const Page = () => {
  // Le ?populate=* permet d'accéder à la jointure
  // const foodListUrl = 'http://localhost:1337/api/foodlist?populate=*'
  const navigate = useNavigate()
  const anonymous = 'ano@t.fr'
  const ownerEmail = localStorage.getItem('logged-in-user-email') || anonymous
  let foodListUrl = `http://localhost:1337/api/foodlist?populate=*&filters[Email][$eq]=${ownerEmail}`
  const [foodList, setFoodList] = useState<FoodItem[]>([])
  
  const getFoodList = async (orderParam?: string) => {
    switch(orderParam) {
      case 'name':
        foodListUrl += `&sort=Name:asc`;
        break;
        case 'nameoff':
          foodListUrl = `http://localhost:1337/api/foodlist?populate=*&filters[Email][$eq]=${ownerEmail}`;
          break;
          case 'eatbefore':
            foodListUrl = `http://localhost:1337/api/foodlist?populate=*&filters[Email][$eq]=${ownerEmail}`;
            break;
          default:
            console.log('No order param')
    }
    const res = await fetch(foodListUrl)
    const jsonData = await res.json()
    console.log({jsonData})
    const parsedResult = foodItemsFormJson(jsonData.data)
    setFoodList(parsedResult)
  }
  
  useEffect(() => {
    if (ownerEmail === anonymous) {
      navigate('/login')
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
    const allFoodAfterDelete = foodList.filter(i => i.id !== id)
    setFoodList(allFoodAfterDelete)
  }

  function handleOrder(parameter: string) {
    if (parameter === 'name' || parameter === 'nameoff' || parameter === 'eatbeforeoff') {
      getFoodList(parameter)
    }
    if (parameter === 'eatbefore') {
      const itemsWithEatBeforeDate = foodList.map((foodItem: FoodItem) => {
        const dateInFuture = add(foodItem.dateAdded, {months: foodItem.maxStayInFreezerInMonth})
        foodItem.eatBeforeDate = dateInFuture
        return foodItem
      })
      const itemSortByDate = itemsWithEatBeforeDate.sort((first: FoodItem, second: FoodItem) => {
        return compareAsc((first as any).eatBeforeDate, (second as any).eatBeforeDate)
      })
      setFoodList(itemSortByDate)
    }
  }

  return (
    <>
    <OrderBy orderItem={handleOrder} />
    {foodList && foodList.map(item => (<FoodCard item={item} key={item.id} deleteItem={handleDelete} />))}
    </>
  )
}

export default Page