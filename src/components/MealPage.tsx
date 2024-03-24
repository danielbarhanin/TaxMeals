import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IngredientProps } from "./Ingredient.tsx";
import Ingredient from "./Ingredient.tsx";
import MealMetadata from "./MealMetadata.tsx";
import {mealByIdUrl, MealResponse} from "../utils/routesData.ts";


interface Meal {
    id: string
    title: string
    img: string
    category: string
    area: string
    instructions: string
    source: string
    youtubeLink: string
    ingredients: IngredientProps[]

}

export default function MealPage() {
    const {id} = useParams()
    const [meal, setMeal] = useState<Meal>()

    const ingredientsElements = meal?.ingredients.map(ingredient =>
        <Ingredient name={ingredient.name} measurement={ingredient.measurement}/>
    )

    function getIngredient(meal: any): IngredientProps[] {
        const ingredients: IngredientProps[] = []

        for (let i=1; i < 21; i ++) {
            if (!meal[`strIngredient${i}`] || !meal[`strMeasure${i}`]) {
                break
            }
            ingredients.push({
                name: meal[`strIngredient${i}`],
                measurement: meal[`strMeasure${i}`]
            })
        }

        return ingredients
    }

    function getMeal(meal: MealResponse): Meal {
        return {
            id: meal.idMeal,
            title: meal.strMeal,
            img: meal.strMealThumb,
            category: meal.strCategory,
            area: meal.strArea,
            instructions: meal.strInstructions,
            source: meal.strSource,
            youtubeLink: meal.strYoutube,
            ingredients: getIngredient(meal)
        }
    }

    useEffect(() => {
        fetch(`${mealByIdUrl}${id}`)
            .then(res => res.json())
            .then(data => setMeal(getMeal(data.meals[0])))
    }, []);

    return (
        <main className="meal-page">
            <h1 className="meal-title">{meal?.title}</h1>
            <div className="meal-metadata-contianer">
                <img src={meal?.img} className="meal-logo" alt="meal-img"/>
                <MealMetadata category={meal?.category} country={meal?.area} source={meal?.source} youtube={meal?.youtubeLink}/>
            </div>
            <h2 className="meal-section">Ingredients</h2>
            <div className="ingredients-contianer">
                {ingredientsElements}
            </div>
            <h2 className="meal-section" >Instructions</h2>
            <p className="meal-instructions">{meal?.instructions}</p>
        </main>
    )
}