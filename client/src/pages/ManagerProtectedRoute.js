import { Navigate } from "react-router-dom"
import { useAppContext } from "../context/appContext"

const ManagerProtectedRoute = ({ children }) => {
    const { user } = useAppContext()
    if (user.role !== 'admin' && user.role !== 'manager') {
       return <Navigate to='/admin/profile' />
    }
    return children
}

export default ManagerProtectedRoute