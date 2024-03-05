import { useEffect, useState } from "react"
import FoodCategory from "../interfaces/FoodCategory"
import { ActionFunctionArgs, Form } from "react-router-dom"
import FoodItem from "../interfaces/FoodItem"

interface Props {
    item?: FoodItem
}

const FormCreateFood = ({ item }: Props) => {
    const [foodCategoryList, setFoodCategoryList] = useState<FoodCategory[]>([])

    const [foodItemName, setFoodItemName] = useState<string>(item?.name || '')
    const [foodItemCategory, setFoodItemCategory] = useState<string>(item?.foodCategory || '')

    const strapiFoodCategoryURL = 'http://localhost:1337/api/food-categories'

    useEffect(() => {
        const getFoodCategoryList = async () => {
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

    const isUpdate = item ? true : false

    function onNameChange(e: React.FormEvent<HTMLInputElement>) {
        setFoodItemName(e.currentTarget.value)
    }

    function onCategoryChange(e: React.FormEvent<HTMLSelectElement>) {
        setFoodItemCategory(e.currentTarget.value)
    }

    return (
        <>
        {isUpdate && (
            <Form action='/foodcreate' method='POST'>
            <input type="text" name="name" placeholder="food name" value={foodItemName} onChange={onNameChange} />
            <br />
            <select name="category" onChange={onCategoryChange}>
                <option value={0}>choose a category</option>
                {foodCategoryList && foodCategoryList.map(categoryItem => (<option value={categoryItem.id} key={categoryItem.id} selected={categoryItem.categoryId === foodItemCategory}>{categoryItem.categoryName}</option>))}
            </select>
            <br />
            <button type="submit">add</button>
        </Form>
        )}
        {!isUpdate && (
            <Form action='/foodcreate' method='POST'>
                <input type="text" name="name" placeholder="food name" />
                <br />
                <select name="category">
                    <option value={0}>choose a category</option>
                    {foodCategoryList && foodCategoryList.map(item => (<option value={item.id} key={item.id}>{item.categoryName}</option>))}
                </select>
                <br />
                <button type="submit">add</button>
            </Form>
        )} 
        </>
    )
}

export const foodCreateAction = async ({ request }: ActionFunctionArgs) => {
    const data = await request.formData()
    const name = data.get('name')
    const category = data.get('category') || 0

    const email = localStorage.getItem('logged-in-user-email')

    const foodItem = {
        data: {
            Name: name,
            Email: email,
            foodcategory: parseInt(category.toString(), 10),
            DateAdded: new Date().toISOString()
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
    location.replace('/foodlist')
    return null
}

export default FormCreateFood