import { useEffect, useState } from "react"
import { useAppContext } from "../context/appContext"
import FormRow from "./FormRow"
import FormRowSelect2 from "./FormRowSelect2"

const AdvancedFilter = () => {



    const {
        handleChange,
        activitySearchName,
        activitySort,
        sortOptions,
        allCategories,
        activityCategories

    } = useAppContext()

    const [filters, setFilters] = useState(activityCategories)

    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }
    const handleCheckbox = (e) => {
        const name = e.target.name
        const value = e.target.checked

        if (value === false) {
            setFilters(prev => prev.filter(item => name !== item))
        } else {
            setFilters(prev => [...prev, name])
        }

    }

    useEffect(() => {
        handleChange({ name: 'activityCategories', value: filters })
    }, [filters])

    return (
        <div >
            <div className="form-center">
                <FormRow
                    type="text"
                    labelText='Search'
                    name='activitySearchName'
                    value={activitySearchName}
                    handleChange={handleInput}
                />
                <FormRowSelect2
                    labelText='sort'
                    name='activitySort'
                    value={activitySort}
                    handleChange={handleInput}
                    list={sortOptions}
                />
            </div>
            <h4>Categories</h4>
            <div className="options">
                {
                    allCategories?.map((category, i) => {
                        return (
                            <label key={i} className="checkbox-container">{category}
                                <input
                                    type="checkbox"
                                    name={category}
                                    onChange={handleCheckbox}
                                    className="checkbox"
                                    checked={activityCategories.includes(category)}
                                />
                                <span className="checkmark"></span>
                            </label>
                        )
                    })
                }
            </div>
        </div>

    )
}

export default AdvancedFilter