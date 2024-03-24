

// API routes
export const searchUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
export const filterUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?"
export const randomUrl = "https://www.themealdb.com/api/json/v1/1/random.php"
export const mealByIdUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

// App routes
export const homeRoute = "/meals"
export const categoryRoute = "/meals/category"
export const countryRoute = "/meals/country"

// Meal response object
export interface MealResponse {
    idMeal: string
    strMealThumb: string
    strMeal: string
    strCategory: string
    strArea: string
    strSource: string
    strInstructions: string
    strYoutube: string
}