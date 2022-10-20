const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>

            <select
                name={name}
                value={value}
                onChange={handleChange}
                className="form-select"
            >
                {
                    list.length > 0 ? (
                        list.map((itemValue) => {
                            return (
                                <option key={itemValue._id} value={itemValue._id}>
                                    {itemValue.name}
                                </option>
                            )
                        })
                    ) : (
                        <option disabled={true} defaultValue>
                            No events availables
                        </option>
                    )
                }
            </select>
        </div>
    )
}

export default FormRowSelect