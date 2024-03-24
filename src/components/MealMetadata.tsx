import category_logo from "../assets/category.svg";
import area_logo from "../assets/area.svg";
import link_logo from "../assets/link.svg";
import youtube_logo from "../assets/youtube.svg"
import {useNavigate} from "react-router-dom";
import {categoryRoute, countryRoute} from "../utils/routesData.ts";

interface MealMetadataProps {
    category: string | undefined
    country: string | undefined
    source: string | undefined
    youtube: string | undefined

}

export default function MealMetadata(props: MealMetadataProps) {
    const navigate = useNavigate()

    return (
        <div className="metadata-card">
            <div className="metadata--section" onClick={() => navigate(`${categoryRoute}/${props.category}`)}>
                <img src={category_logo} alt="category logo" className="metadata--category-logo"/>
                <span className="metadata--span">{props.category}</span>
            </div>
            <div className="metadata--section" onClick={() => navigate(`${countryRoute}/${props.country}`)}>
                <img src={area_logo} alt="area logo" className="metadata--area-logo"/>
                <span className="metadata--span">{props.country}</span>
            </div>
            {
                props.source &&
                <div className="metadata--section">
                    <img src={link_logo} alt="link logo" className="metadata-link-logo"/>
                    <span>
                         <a style={{display: "table-cell"}} href={props.source} target="_blank">Source</a>
                    </span>
                </div>
            }
            {
                props.youtube &&
                <div className="metadata--section">
                    <img src={youtube_logo} alt="link logo" className="metadata-youtube-logo"/>
                    <span>
                         <a style={{display: "table-cell"}} href={props.youtube} target="_blank">Youtube</a>
                    </span>
                </div>
            }
        </div>
    )

}