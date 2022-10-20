import moment from 'moment'
import { FaLocationArrow, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import { useAppContext } from '../context/appContext'
import JobInfo from './JobInfo'

const Event = ({
    _id,
    name,
    company,
    location,
    date,
}) => {
    const { setEditEvent, deleteEvent } = useAppContext()

    
    let dateDisplay = moment(date)
    dateDisplay = dateDisplay.format('MMM Do, YYYY')

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{name.charAt(0)}</div>
                <div className='info'>
                    <h5>{name}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={location} />
                    <JobInfo icon={<FaCalendarAlt />} text={dateDisplay} />
                </div>
                <footer className='actions'>
                    <Link
                        to='/admin/add-event'
                        onClick={() => setEditEvent(_id)}
                        className='btn edit-btn'
                    >
                        Edit
                    </Link>
                    <button
                        type='button'
                        className='btn delete-btn'
                        onClick={() => deleteEvent(_id)}
                    >
                        Delete
                    </button>
                </footer>

            </div>
        </Wrapper>

    )
}

export default Event