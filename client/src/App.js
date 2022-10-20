import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Landing, Error, Register, ProtectedRoute } from './pages'
import ManagerProtectedRoute from './pages/ManagerProtectedRoute';
import {
  AddJob,
  AllJobs,
  Profile,
  Stats,
  SharedLayout
} from './pages/dashboard'
import AddUser from './pages/dashboard/AddUser';
import AllUsers from './pages/dashboard/AllUsers';
import AdminProtectedRoute from './pages/AdminProtectedRoute';
import AlertPopUp from './components/AlertPopUp';
import { useAppContext } from './context/appContext';
import AllEvents from './pages/dashboard/AllEvents';
import AddEvent from './pages/dashboard/AddEvent';
import AllActivities from './pages/dashboard/AllActivities';
import AddActivity from './pages/dashboard/AddActivity';
import Events from './pages/Events';
import MainNavbar from './components/MainNavbar';
import SingleEvent from './pages/SingleEvent';
import AdvancedSearcher from './pages/AdvancedSearcher';



function App() {
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext()

  return (
    <>

      {showAlert && <AlertPopUp />}
      <BrowserRouter>
        <Routes>

          <Route path="/admin/" element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>

            <Route index element={<ManagerProtectedRoute><Stats /></ManagerProtectedRoute>} />
            <Route path="all-jobs" element={<ManagerProtectedRoute><AllJobs /></ManagerProtectedRoute>} />
            <Route path="add-job" element={<ManagerProtectedRoute><AddJob /></ManagerProtectedRoute>} />
            <Route path="all-events" element={<AdminProtectedRoute><AllEvents /></AdminProtectedRoute>} />
            <Route path="add-event" element={<AdminProtectedRoute><AddEvent /></AdminProtectedRoute>} />
            <Route path="all-activities" element={<ManagerProtectedRoute><AllActivities /></ManagerProtectedRoute>} />
            <Route path="add-activity" element={<ManagerProtectedRoute><AddActivity /></ManagerProtectedRoute>} />
            <Route path="all-users" element={<AdminProtectedRoute><AllUsers /></AdminProtectedRoute>} />
            <Route path="add-user" element={<AdminProtectedRoute><AddUser /></AdminProtectedRoute>} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<MainNavbar />}>
            <Route index element={<Events />} />
            <Route path=":id" element={<SingleEvent />} />
            <Route path=":id/searcher" element={<AdvancedSearcher />} />
          </Route>

          <Route path="*" element={<Error />} />

        </Routes>
      </BrowserRouter >
    </>


  );
}

export default App;
