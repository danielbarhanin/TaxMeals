
import category_logo from "../assets/category.svg"
import area_logo from "../assets/area.svg"
import link_logo from "../assets/link.svg"
import {useNavigate} from "react-router-dom";
import {homeRoute} from "../utils/routesData.ts";

export interface MealCardData {
    id: string
    img: string
    title: string
    category: string | undefined
    area: string | undefined
    link: string | undefined
}

export default function MealCard(props: MealCardData) {
    const navigate = useNavigate()

    return (
        <div className="card" onClick={() => navigate(`${homeRoute}/${props.id}`)}>
            <img src={props.img} alt="mealImg" className="card--img"/>
            <div className="card--details">
                <p className="card--title"><b>{props.title}</b></p>
                {
                    props.category &&
                    <div className="details--section">
                        <img src={category_logo} alt="category logo" className="card--category-logo"/>
                        <span>{props.category}</span>
                    </div>
                }
                {
                    props.area &&
                    <div className="details--section">
                        <img src={area_logo} alt="area logo" className="card--area-logo"/>
                        <span>{props.area}</span>
                    </div>
                }
                {
                    props.link &&
                    <div className="details--section">
                        <img src={link_logo} alt="link logo" className="link-logo"/>
                        <span>
                         <a style={{display: "table-cell"}} href={props.link} target="_blank">Source</a>
                    </span>
                    </div>
                }
            </div>
        </div>
    )

}