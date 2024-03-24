import category_logo from "../assets/category.svg";
import area_logo from "../assets/area.svg";
import random_logo from "../assets/random.png"
import Filter, {FilterProps} from "./Filter.tsx";
import {nanoid} from "nanoid";
import React from "react";

interface SearchSectionProps {
    mealName: string
    categoryFilterProps: FilterProps
    countryFilterProps: FilterProps
    handleNameSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
    handleRandom: () => void
}

export default function SearchSection(props: SearchSectionProps) {
    return (
        <section className="search-section">
            <input
                className="search-bar"
                placeholder="Search Meal by name"
                value={props.mealName}
                onChange={props.handleNameSearch}
            />
            <p className="filter-by">Filter by:</p>
            <img src={category_logo} alt="category logo" className="category-logo"/>
            <Filter
                key={nanoid()}
                title={props.categoryFilterProps.title}
                type={props.categoryFilterProps.type}
                values={props.categoryFilterProps.values}
                showClear={props.categoryFilterProps.showClear}
                onSelect={props.categoryFilterProps.onSelect}
            />
            <img src={area_logo} alt="country logo" className="country-logo"/>
            <Filter
                key={nanoid()}
                title={props.countryFilterProps.title}
                type={props.countryFilterProps.type}
                values={props.countryFilterProps.values}
                showClear={props.countryFilterProps.showClear}
                onSelect={props.countryFilterProps.onSelect}
            />
            <button className="random-button" onClick={props.handleRandom}>
                <img src={random_logo} alt="random logo" className="random-logo"/>
                Random Meal
            </button>
        </section>
    )
}