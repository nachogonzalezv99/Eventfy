import { useAppContext } from "../../context/appContext"
import { FormRow, FormRowSelect } from '../../components'
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import FormRowSelect2 from "../../components/FormRowSelect2"

const AddJob = () => {
  const {
    isLoading,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    handleChange,
    clearValues,
    createJob,
    editJob
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    if (isEditing){
      editJob()
      return
    }
    createJob()
  }

  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({name, value})
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
          <FormRow
            type="text"
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          <FormRow
            type="text"
            labelText='location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          <FormRowSelect2
            name='status'
            value={status}
            handleChange={handleJobInput}
            list={statusOptions}
          />
           <FormRowSelect2
            name='jobType'
            labelText='type'
            value={jobType}
            handleChange={handleJobInput}
            list={jobTypeOptions}
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
      </form>
    </Wrapper>
  )
}

export default AddJob