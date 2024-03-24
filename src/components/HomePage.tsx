import MealCard, {MealCardData} from "./MealCard.tsx";
import React, {useEffect, useState} from "react";
import {nanoid} from "nanoid"
import SearchSection from "./SearchSection.tsx";
import {categoryValues, countryValues, MetadataType} from "../utils/filterData.ts";
import {createAMeal, filterMealByType} from "../utils/MealFetchHelpers.ts";
import {randomUrl, searchUrl} from "../utils/routesData.ts";


export default function HomePage() {
    const [spinner, setSpinner] = useState(false)
    const [meals, setMeals] = useState<MealCardData[]>([])
    const [mealName, setMealName] = useState("")
    const [category, setCategory] = useState("")
    const [country, setCountry] = useState("")
    const doubleFilter = country && category

    const categoryFilterProps = {
        title: category,
        type: MetadataType.CATEGORY,
        values: categoryValues,
        showClear: true,
        onSelect: handleFilter
    }
    const countryFilterProps = {
        title: country,
        type: MetadataType.COUNTRY,
        values: countryValues,
        showClear: true,
        onSelect: handleFilter
    }

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
        fetchMeals(searchUrl)
    }, []);

    function fetchMeals(url: string) {
        setSpinner(true)
        fetch(url)
            .then(res => res.json())
            .then(data => setMeals(
                data.meals? data.meals.map(meal => createAMeal(meal)) : []
            ))
            .then(() => setSpinner(false))
    }

    function handleNameSearch(event: React.ChangeEvent<HTMLInputElement>) {
        fetchMeals(`${searchUrl}${event.target.value}`)
        setMealName(event.target.value)
        setCategory("")
        setCountry("")
    }

    async function handleDoubleFilter(type: MetadataType, value: string) {
        const categoryValue = type == MetadataType.CATEGORY ? value : category
        const countryValue = type == MetadataType.COUNTRY? value : country
        setCategory(categoryValue)
        setCountry(countryValue)

        if (doubleFilter) {
            setSpinner(true)
            const filteredMeals = await filterMealByType(MetadataType.CATEGORY, categoryValue)
            setSpinner(false)
            setMeals(filteredMeals.filter(meal => meal.area == countryValue))
        } else {
            setMeals(meals.filter(meal =>
                meal.category == categoryValue && meal.area == countryValue
            ))
        }
    }

    async function handleClearOption(type: MetadataType) {
        const isCategory = type == MetadataType.CATEGORY

        if (doubleFilter) {
            const filterValue = isCategory? country : category
            const filterType = isCategory? MetadataType.COUNTRY : MetadataType.CATEGORY
            isCategory? setCategory("") : setCountry("")
            setSpinner(true)
            setMeals(await filterMealByType(filterType, filterValue).finally(() => setSpinner(false)))
        } else {
            setCategory("")
            setCountry("")
            fetchMeals(searchUrl)
        }
    }

    async function handleFilter(type: MetadataType, value: string) {
        if (value == "clear") {
            handleClearOption(type)
        }
        else if (doubleFilter || (type == MetadataType.COUNTRY && category) || (type == MetadataType.CATEGORY && country)) {
            handleDoubleFilter(type, value)
        } else {
            type == MetadataType.CATEGORY ? setCategory(value) : setCountry(value)
            setMealName("")

            setSpinner(true)
            setMeals(await filterMealByType(type, value).finally(() => setSpinner(false)))

        }
    }

    function handleRandom() {
        fetchMeals(randomUrl)
        setCountry("")
        setCategory("")
        setMealName("")
    }

    return (
        <>
            <SearchSection
                mealName={mealName}
                handleNameSearch={handleNameSearch}
                categoryFilterProps={categoryFilterProps}
                countryFilterProps={countryFilterProps}
                handleRandom={() => handleRandom()}
            />
            {spinner &&
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            }
            {!spinner &&
                <div className="meals-container">
                    {mealElements}
                </div>
            }
        </>
    )
}