import { useState } from "react"
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import { FormRow } from "../../components"
import { useAppContext } from "../../context/appContext"

const Profile = () => {
  const { user, displayAlert, updateUser, isLoading } = useAppContext()

  const [name, setName] = useState(user ? user.name : null)
  const [email, setEmail] = useState(user ? user.email : null)
  const [lastName, setLastName] = useState(user ? user.lastName : null)
  const [location, setLocation] = useState(user ? user.location : null)
  const [role, setRole] = useState(user ? user.role : null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastName || !location || !role) {
      displayAlert()
      return
    }

    updateUser({ name, email, lastName, location })
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <FormRow
            type='text'
            name='name'
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText='last name'
            type='text'
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='email'
            name='email'
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type='text'
            name='location'
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          
          <div className="form-row">
            <label htmlFor='role' className="form-label">
              role
            </label>
            <input
              value={role}
              name='role'
              id='role'
              className="form-input"
              disabled={true}
            />
          </div>

          <button className="btn btn-block" type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile