import { FaLocationArrow, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Job'
import { useAppContext } from '../context/appContext'
import JobInfo from './JobInfo'

const User = ({
    _id,
    name,
    email,
    lastName,
    location,
    role,
}) => {
    const { setEditUser, deleteUser } = useAppContext()

    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{name.charAt(0)}</div>
                <div className='info'>
                    <h5>{name} {lastName}</h5>
                    <p>{email}</p>
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={location} />
                    <JobInfo icon={<FaLock />} text={role} />
                </div>
                <footer className='actions'>
                    <Link
                        to='/admin/add-user'
                        onClick={() => setEditUser(_id)}
                        className='btn edit-btn'
                    >
                        Edit
                    </Link>
                    <button
                        type='button'
                        className='btn delete-btn'
                        onClick={() => deleteUser(_id)}
                    >
                        Delete
                    </button>
                </footer>

            </div>
        </Wrapper>

    )
}

export default User