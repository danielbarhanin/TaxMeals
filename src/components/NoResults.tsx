
import no_result_img from "../assets/no_results.svg"


export default function NoResults() {
    return (
        <div className="no-results-container">
            <h2>No Meals were found</h2>
            <img src={no_result_img} alt="no-result-logo"/>
        </div>
    )
}