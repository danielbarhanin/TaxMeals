
import ingredient_logo from "../assets/ingredient.png"

export interface IngredientProps {
    name: string,
    measurement: string
}

export default function Ingredient(props: IngredientProps) {
    return (
        <div className="ingredient">
            <img src={ingredient_logo} alt="ingredient-logo" className="ingredient-logo"/>
            <p className="measurements">{props.measurement}</p>
            <p className="ingredient-name">{props.name}</p>
        </div>
    )

}