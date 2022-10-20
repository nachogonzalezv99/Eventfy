import { useAppContext } from "../../context/appContext"
import { FormRow, FormRowSelect } from '../../components'
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import FileBase from 'react-file-base64'
import { useEffect } from "react"
import FormRowSelect2 from "../../components/FormRowSelect2"
import Map2 from "../../components/Map2"
import { categories } from "../../utils/categories"

const AddActivity = () => {
  const {
    isLoading,
    displayAlert,
    activityName,
    activityDescription,
    activityCategory,
    activityEvent_id,
    activityImg,
    activityCoordinates,
    events,
    isEditing,
    handleChange,
    clearActivity,
    createActivity,
    editActivity,
    getEvents,
    changeEventId,
  } = useAppContext()



  const handleSubmit = (e) => {
    e.preventDefault()
    if (!activityName || !activityDescription || !activityCategory || !activityEvent_id || !activityImg || !activityCoordinates) {
      displayAlert()
      return
    }
    if (isEditing) {
      editActivity()
      return
    }
    createActivity()
  }

  const handleActivityInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }
  const handleActivityEventId = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
    changeEventId(e.target.value)
  }

  useEffect(() => {
    getEvents()
    //eslint-disabled-next-line
  }, [])


  useEffect(() => {
    if (!isEditing) clearActivity()
  }, [events])

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit activity' : 'add activity'}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            labelText='name'
            name='activityName'
            value={activityName}
            handleChange={handleActivityInput}
          />
          <FormRow
            type="text"
            labelText='description'
            name='activityDescription'
            value={activityDescription}
            handleChange={handleActivityInput}
          />
          <FormRowSelect2
            labelText='category'
            name='activityCategory'
            value={activityCategory}
            handleChange={handleActivityInput}
            list={categories}
          />

          <FormRowSelect
            labelText='event'
            name='activityEvent_id'
            value={activityEvent_id}
            handleChange={handleActivityEventId}
            list={events}
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => handleChange({ name: 'activityImg', value: base64 }) }

          />

        </div>

        {/* <Map
          coordinates={events.find(item => item._id === activityEvent_id).coordinates}
          zoom={events.find(item => item._id === activityEvent_id).zoom}
          paths={events.find(item => item._id === activityEvent_id).paths}
        /> */}
        <Map2 />

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
              clearActivity()
            }}
          >
            clear
          </button>

        </div>
      </form>
    </Wrapper>
  )
}

export default AddActivity