import { FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import { useAppContext } from '../context/appContext'
import JobInfo from './JobInfo'

const Activity = ({
    _id,
    name,
    eventName,
    category,
    description,
    username
}) => {
    const { setEditActivity, deleteActivity } = useAppContext()


    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{name.charAt(0)}</div>
                <div className='info'>
                    <h5>{name}</h5>

                    <p>{eventName}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaUserAlt />} text={username} />
                    <div className={`status pending`}>{category}</div>
                </div>
                <footer className='actions'>
                    <Link
                        to='/admin/add-activity'
                        onClick={() => setEditActivity(_id)}
                        className='btn edit-btn'
                    >
                        Edit
                    </Link>
                    <button
                        type='button'
                        className='btn delete-btn'
                        onClick={() => deleteActivity(_id)}
                    >
                        Delete
                    </button>
                </footer>

            </div>
        </Wrapper>

    )
}

export default Activity