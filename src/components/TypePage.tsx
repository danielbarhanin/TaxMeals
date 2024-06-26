import {useEffect, useState} from "react";
import MealCard, {MealCardData} from "./MealCard.tsx";
import {nanoid} from "nanoid";
import {useNavigate, useParams} from "react-router-dom";
import Filter from "./Filter.tsx";
import {categoryValues, countryValues, MetadataType} from "../utils/filterData.ts";
import {categoryRoute, countryRoute, filterUrl, MealResponse} from "../utils/routesData.ts";
import {createAMeal} from "../utils/MealFetchHelpers.ts";


export default function TypePage(props: {type: MetadataType}) {
    const prefix = props.type == MetadataType.CATEGORY? "c=" : "a="
    const {category, country} = useParams()
    const [title, setTitle] = useState(category || country || "")
    const values = props.type == MetadataType.CATEGORY ? categoryValues : countryValues
    const [meals, setMeals] = useState<MealCardData[]>([])
    const navigate = useNavigate()

    const mealElements = meals.map(meal =>
        <MealCard
            key={nanoid()}
            id={meal.id}
            img={meal.img}
            title={meal.title}
            category={meal.category}
            area={meal.area}
            link={meal.link}
        />
    )

    useEffect(() => {
        const newTitle = category || country || ""
        setTitle(newTitle)
        fetchMeals(`${filterUrl}${prefix}${newTitle}`)
    }, [props.type, country, category]);

    function fetchMeals(url: string) {
        fetch(url)
            .then(res => res.json())
            .then(data => setMeals(
                data.meals? data.meals.map((meal: MealResponse) => createAMeal(meal)) : []
            ))
    }

    async function handleTypeSelected(type: MetadataType, value: string) {
        const prefix = type == MetadataType.CATEGORY? categoryRoute : countryRoute
        navigate(`${prefix}/${value}`)
    }

    return (
        <main className="type-page">
            <h1 className="type--title">{title}</h1>
            <div className="type-page--filter">
                <h3 className="type-page--filter-title">{props.type}:</h3>
                <Filter
                    title={title}
                    type={props.type}
                    values={values}
                    showClear={false}
                    onSelect={handleTypeSelected}/>
            </div>
                <div className="meals-container">
                    {mealElements}
                </div>
        </main>
    )
}