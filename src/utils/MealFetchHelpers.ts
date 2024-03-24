
import {MealCardData} from "../components/MealCard.tsx";
import {MetadataType} from "./filterData.ts";
import {filterUrl, mealByIdUrl, MealResponse} from "./routesData.ts";

export function createAMeal(meal: MealResponse): MealCardData {
    return {
        id: meal.idMeal,
        img: meal.strMealThumb,
        title: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        link: meal.strSource,
    }
}

async function fetchFilteredMealsId(url: string) {
    const res = await fetch(url)
    const data = await res.json()
    return data.meals.map((meal: { idMeal: MealResponse }) => meal.idMeal)
}

async function fetchMealsByMealId(mealsId: string[]) {
    const meals = []
    for (const id of mealsId) {
        const r = await fetch(`${mealByIdUrl}${id}`)
        const d = await r.json()
        const meal = createAMeal(d.meals[0])
        meals.push(meal)
    }

    return meals
}

export async function filterMealByType(type: MetadataType, value: string) {
    const prefix = type == MetadataType.CATEGORY ? "c=" : "a="
    const url = `${filterUrl}${prefix}${value}`

    const mealsId = await fetchFilteredMealsId(url)
    return fetchMealsByMealId(mealsId)
}
