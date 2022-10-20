import { useAppContext } from "../../context/appContext"
import { FormRow } from '../../components'
import Wrapper from "../../assets/wrappers/DashboardFormPage"
import Map from "../../components/Map"
import FileBase from 'react-file-base64'

const AddEvent = () => {
  const {
    isLoading,
    displayAlert,
    eventName,
    eventDescription,
    eventCompany,
    eventLocation,
    eventDate,
    eventImg,
    eventCoordinates,
    eventZoom,
    eventPaths,
    isEditing,
    handleChange,
    clearValues,
    createEvent,
    editEvent
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!eventName || !eventDescription || !eventCompany || !eventLocation || !eventDate || !eventImg || !eventCoordinates || !eventZoom || !eventPaths.length) {
      displayAlert()
      return
    }
    if (isEditing) {
      editEvent()
      return
    }
    createEvent()
  }

  const handleEventInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? 'edit event' : 'add event'}</h3>
        <div className="form-center">
          <FormRow
            type="text"
            labelText='name'
            name='eventName'
            value={eventName}
            handleChange={handleEventInput}
          />
          <FormRow
            type="text"
            labelText='description'
            name='eventDescription'
            value={eventDescription}
            handleChange={handleEventInput}
          />
          <FormRow
            type="text"
            labelText='company'
            name='eventCompany'
            value={eventCompany}
            handleChange={handleEventInput}
          />
          <FormRow
            type="text"
            labelText='location'
            name='eventLocation'
            value={eventLocation}
            handleChange={handleEventInput}
          />
          <div className="form-row">
            <label htmlFor="eventDate" className="form-label">
              Date
            </label>
            <input
              type="datetime-local"
              name='eventDate'
              value={eventDate}
              id='eventDate'
              onChange={handleEventInput}
              className="form-input"
            />
          </div>

          <div className="form-row">
            <label className="form-label">
              Image
            </label>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => handleChange({ name: 'eventImg', value: base64 })}
              className="form-input"
            />
          </div>


        </div>
        <Map coordinates={eventCoordinates} zoom={eventZoom} paths={eventPaths} />

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

export default AddEvent