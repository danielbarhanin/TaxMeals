import {MetadataType} from "../utils/filterData.ts";
import {nanoid} from "nanoid"

export interface FilterProps {
    title: string
    type: MetadataType
    values: string[]
    showClear: boolean
    onSelect: (type: MetadataType, value: string) => void
}

export default function Filter(props: FilterProps) {
    const dropdownItems = props.values.map(action =>
        <option key={nanoid()} value={action}>{action}</option>
    )

    return (
        <div>
            <select
                name="filter-options"
                id="filter-options"
                value={props.title}
                className="filter-options"
                onChange={(event) => props.onSelect(props.type, event.target.value)}>
                <option value="" disabled selected hidden>{props.type}</option>
                {dropdownItems}
                {props.showClear && <option value="clear">Clear</option>}
            </select>
        </div>
    )
}
