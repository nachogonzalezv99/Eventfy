import { useAppContext } from "../../context/appContext"
import { FormRow } from '../../components'
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import FormRowSelect2 from "../../components/FormRowSelect2"
import { useNavigate } from "react-router-dom"

const AddUser = () => {
    const navigate = useNavigate()
    const {
        isLoading,
        displayAlert,
        isEditing,
        handleChange,
        clearValues,
        editUser,
        userName,
        userRole,
        userEmail,
        userLastname,
        userLocation
    } = useAppContext()
    

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!userName || !userEmail || !userLastname || !userLocation) {
            displayAlert()
            return
        }
        editUser()
        navigate('/admin/all-users')
    }

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({ name, value })
    }

    return (
        <Wrapper>
            <form className="form">
                <h3>edit user</h3>
                <div className="form-center">
                    <FormRow
                        type="text"
                        label="name"
                        name='userName'
                        value={userName}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        labelText='last name'
                        type="text"
                        name='userLastname'
                        value={userLastname}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type="email"
                        name='userEmail'
                        value={userEmail}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type="text"
                        label='location'
                        name='userLocation'
                        value={userLocation}
                        handleChange={handleJobInput}
                    />
                    <FormRowSelect2
                        name='userRole'
                        labelText='type'
                        value={userRole}
                        handleChange={handleJobInput}
                        list={['admin', 'manager', 'user']}
                    />

                    <div className="btn-container">
                        <button
                            className="btn btn-block submit-btn"
                            type='submit'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            submit
                        </button>

                        <button
                            className="btn btn-block clear-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddUser