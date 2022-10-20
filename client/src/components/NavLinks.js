import { NavLink } from "react-router-dom"
import { useAppContext } from "../context/appContext"
import { IoBarChartSharp } from 'react-icons/io5'
import { IoIosArrowDown } from 'react-icons/io'
import { MdQueryStats } from 'react-icons/md'
import { AiOutlineCalendar } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { MdLocalActivity } from 'react-icons/md'
import { ImProfile } from 'react-icons/im'


const NavLinks = ({ toggleSidebar }) => {
    const { user, clearValues, clearActivity } = useAppContext()

    return (
        <ul className='main-nav'>
            {(user.role === 'manager' || user.role === 'admin') && <li>
                <NavLink to='/admin/' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span className="icon">
                        <IoBarChartSharp />
                    </span>
                    Stats
                </NavLink>
            </li>}
            {user.role === 'admin' && <li>
                <NavLink to='all-events' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span className="icon">
                        <AiOutlineCalendar />
                    </span>
                    Events
                    <span className="dropdown-icon">
                        <IoIosArrowDown />
                    </span>
                </NavLink>
                <ul className='second-nav'>
                    <li>
                        <NavLink to='all-events' className='nav-link second'>
                            All Events
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='add-event' className='nav-link second' onClick={clearValues}>
                            Add Event
                        </NavLink>
                    </li>

                </ul>
            </li>}
            {(user.role === 'manager' || user.role === 'admin') && <li>
                <NavLink to='all-activities' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span className="icon">
                        <MdLocalActivity />
                    </span>
                    Activities
                    <span className="dropdown-icon">
                        <IoIosArrowDown />
                    </span>
                </NavLink>
                <ul className='second-nav'>
                    <li>
                        <NavLink to='all-activities' className='nav-link second'>
                            All Activities
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='add-activity' className='nav-link second' onClick={clearActivity}>
                            Add Activity
                        </NavLink>
                    </li>
                </ul>
            </li>}
            {user.role === 'admin' && <li>
                <NavLink to='all-users' className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span className="icon">
                        <AiOutlineUser />
                    </span>
                    Users
                    <span className="dropdown-icon">
                        <IoIosArrowDown />
                    </span>
                </NavLink>
                <ul className='second-nav'>
                    <li>
                        <NavLink to='all-users' className='nav-link second'>
                            All Users
                        </NavLink>
                    </li>
                </ul>
            </li>}
            <li>
                <NavLink to='profile' className='nav-link'>
                    <span className="icon">
                        <ImProfile />
                    </span>
                    Profile
                </NavLink>
            </li>

        </ul>


    )
}

export default NavLinks
