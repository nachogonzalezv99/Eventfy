import { Navigate } from "react-router-dom"
import { useAppContext } from "../context/appContext"

const AdminProtectedRoute = ({ children }) => {
    const { user } = useAppContext()
    if (user.role !== 'admin') {
        return <Navigate to='/admin' />
    }
    return children
}

export default AdminProtectedRoute