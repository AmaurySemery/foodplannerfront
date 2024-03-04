import { useEffect, useState } from "react"
import FoodCategory from "../interfaces/FoodCategory"
import { Form } from "react-router-dom"

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
        <Form action='create-food' method='POST'>
            <input type="text" name="name" placeholder="food name" />
            <br />
            <select name="category">
                <option value="">choose a category</option>
                { foodCategoryList && foodCategoryList.map(item => (<option value={item.categoryId} key={item.categoryId}>{item.categoryName}</option>)) }
            </select>
            <br />
            <button type="submit">add</button>
        </Form>
    </>
  )
}

export default FormCreateFood