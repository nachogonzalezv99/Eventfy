import { NavLink, useNavigate } from "react-router-dom"
import { FaUserCircle } from 'react-icons/fa'
import Wrapper from "../assets/wrappers/MainNavbar"
import { Outlet } from "react-router-dom"
import { useAppContext } from "../context/appContext"
import Logo from "./Logo"

function MainNavbar() {
    const { user, clearValues } = useAppContext()
    const navigate = useNavigate()
    return (
        <Wrapper >
            <nav className="nav">
                <div className="container">
                    <div className="flex">
                        <NavLink to="/">
                            <Logo />
                        </NavLink>
                        <div className="flex-r">

                        <div className="btn-container">
                            {user ? (
                                <button
                                    type="button"
                                    className="btn-sm"
                                    onClick={() => {
                                        navigate('/admin')
                                        clearValues()
                                    }}
                                >
                                    <FaUserCircle />
                                    {user && user.name}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn-sm"
                                    onClick={() => navigate('/register')}
                                >
                                    Register / Login
                                </button>
                            )}
                        </div>
                        </div>
                       
                    </div>
                </div>
            </nav>
            <Outlet />
        </Wrapper >

    )
}

export default MainNavbar