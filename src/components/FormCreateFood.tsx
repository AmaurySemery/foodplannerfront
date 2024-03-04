import { useEffect, useState } from "react"
import FoodCategory from "../interfaces/FoodCategory"
import { ActionFunctionArgs, Form } from "react-router-dom"

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
        <Form action='/foodcreate' method='POST'>
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

export const foodCreateAction = async ({request}: ActionFunctionArgs) => {
    const data = await request.formData()
    const name = data.get('name')
    const category = data.get('category')

    const email = localStorage.getItem('logged-in-user-email')

    const foodItem = {
        data: {
            name,
            email,
            food_category: category,
            dateadded: new Date().toISOString()
        }
    }

    const strapiFoodCreateUrl = 'http://localhost:1337/api/foodlist'
    const createdFoodItem = await fetch(strapiFoodCreateUrl, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foodItem, null, 2)
    })

    console.log({ createdFoodItem })
    return null
}

export default FormCreateFood