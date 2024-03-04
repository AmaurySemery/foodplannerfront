import { useEffect, useState } from "react"
import FoodCategory from "../interfaces/FoodCategory"

const FormCreateFood = () => {
    const [foodCategoryList, setFoodCategoryList] = useState<FoodCategory[]>([])
    const strapiFoodCategoryURL = 'http://localhost:1337/api/food-categories'

    useEffect(() => {
        const getFoodCategoryList = async() => {
            const res = await fetch(strapiFoodCategoryURL)
            const jsonData = await res.json()
            const parsedResult = foodCategoriesFromArray(jsonData.data)
            setFoodCategoryList(parsedResult)
        }

        getFoodCategoryList()
    }, [])

    function foodCategoriesFromArray(data: any[]): FoodCategory[] {
        return data.map(item => {
            const foodCategory: FoodCategory = {
                id: item.id,
                categoryId: item.attributes.CategoryId,
                categoryName: item.attributes.Name
            }
            return foodCategory
        })
    }

  return (
    <>
    {JSON.stringify(foodCategoryList, null, 2)}
    </>
  )
}

export default FormCreateFood