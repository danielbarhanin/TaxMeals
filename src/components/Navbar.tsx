
import logo from "../../public/app_logo.svg"
import {useNavigate} from "react-router-dom";
import {categoryRoute, countryRoute, homeRoute} from "../utils/routesData.ts";

export default function Navbar() {
    const navigate = useNavigate()

    const homeButtonBackground = {
        backgroundColor: window.location.pathname.endsWith(homeRoute) ? "#E1D9D1" : "#F6F5F5"
    }

    const categoryButtonBackground = {
        backgroundColor: window.location.pathname.startsWith(categoryRoute) ? "#E1D9D1" : "#F6F5F5"
    }

    const countryButtonBackground = {
        backgroundColor: window.location.pathname.startsWith(countryRoute) ? "#E1D9D1" : "#F6F5F5"
    }

    function handleHomeClicked() {
        navigate(homeRoute)
        window.location.reload()
    }

    return (
        <nav>
            <div className="nav--upper">
                <img src={logo} alt="navIcon" className="nav--logo" onClick={handleHomeClicked}/>
                <h1 className="nav--title" onClick={handleHomeClicked}>TaxMeals</h1>
                <p className="nav--p" onClick={() => navigate("/meals/powered_by")}>Ⓒ powered by <b>DBH</b></p>
            </div>
            <div className="nav--lower">
                <button className="nav-button" onClick={handleHomeClicked} style={homeButtonBackground}>Home</button>
                <button className="nav-button" onClick={() => navigate(`${categoryRoute}/Beef`)} style={categoryButtonBackground}>Category</button>
                <button className="nav-button" onClick={() => navigate(`${countryRoute}/American`)} style={countryButtonBackground}>Country</button>
            </div>
        </nav>
    )
}
