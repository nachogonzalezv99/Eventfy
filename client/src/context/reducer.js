import {
    CLEAR_ALERT,
    DISPLAY_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
    GET_USERS_BEGIN,
    GET_USERS_SUCCESS,
    DELETE_USER_BEGIN,
    SET_EDIT_USER,
    EDIT_USER_BEGIN,
    EDIT_USER_SUCCESS,
    EDIT_USER_ERROR,
    CREATE_EVENT_BEGIN,
    CREATE_EVENT_SUCCESS,
    CREATE_EVENT_ERROR,
    GET_EVENTS_BEGIN,
    GET_EVENTS_SUCCESS,
    DELETE_EVENT_BEGIN,
    SET_EDIT_EVENT,
    EDIT_EVENT_BEGIN,
    EDIT_EVENT_SUCCESS,
    EDIT_EVENT_ERROR,
    GET_SINGLE_EVENT,
    GET_ACTIVITIES_BEGIN,
    GET_ACTIVITIES_SUCCESS,
    CREATE_ACTIVITY_BEGIN,
    CREATE_ACTIVITY_SUCCESS,
    CREATE_ACTIVITY_ERROR,
    DELETE_ACTIVITY_BEGIN,
    SET_EDIT_ACTIVITY,
    EDIT_ACTIVITY_BEGIN,
    EDIT_ACTIVITY_SUCCESS,
    EDIT_ACTIVITY_ERROR,
    CHANGE_EVENT_ID_SUCCESS,
    CLEAR_ACTIVITY

} from "./actions"
import { initialState } from "./appContext"

const reducer = (state, action) => {
    if (action.type === DISPLAY_ALERT) {
        return {
            ...state,
            showAlert: true,
            alertType: 'danger',
            alertText: 'Please provide all values!',
        }
    }

    if (action.type === CLEAR_ALERT) {
        return {
            ...state,
            showAlert: false,
            alertType: '',
            alertText: '',
        }
    }

    if (action.type === SETUP_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === SETUP_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: action.payload.alertText,
            userRole: action.payload.role
        }
    }

    if (action.type === SETUP_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === UPDATE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === UPDATE_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            token: action.payload.token,
            user: action.payload.user,
            userLocation: action.payload.location,
            jobLocation: action.payload.location,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Profile Updated!',
        }
    }

    if (action.type === UPDATE_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === LOGOUT_USER) {
        return {
            ...initialState,
            user: null,
            token: null,
            userLocation: '',
            jobLocation: '',
        }
    }

    if (action.type === TOGGLE_SIDEBAR) {
        return {
            ...state,
            showSidebar: !state.showSidebar
        }
    }

    if (action.type === HANDLE_CHANGE) {
        return {
            ...state,
            page: 1,
            [action.payload.name]: action.payload.value
        }
    }

    if (action.type === CLEAR_VALUES) {
        const initialState = {
            isEditing: false,
            editId: '',
            page: 1,
            selectedEvent: '',
            position: '',
            company: '',
            jobLocation: state.userLocation,
            jobType: 'full-time',
            status: 'pending',
            eventName: '',
            eventDescription: '',
            eventCompany: '',
            eventLocation: state.userLocation,
            eventDate: '',
            eventImg: '',
            eventCoordinates: { lat: '0', lng: '0' },
            eventZoom: '2',
            eventPaths: [],
            activityName: '',
            activityDescription: '',
            activityCategory: 'Comida',
            activityEvent_id: '',
            activityImg: '',
            activityCoordinates: null,
        }
        return {
            ...state,
            ...initialState
        }
    }

    if (action.type === CREATE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === CREATE_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New job created!',
        }
    }

    if (action.type === CREATE_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_JOBS_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === GET_JOBS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            jobs: action.payload.jobs,
            total: action.payload.total,
            numOfPages: action.payload.numOfPages,
        }
    }

    if (action.type === SET_EDIT_JOB) {
        const job = state.jobs.find(job => job._id === action.payload.id)
        const { _id, position, company, jobLocation, jobType, status } = job
        return {
            ...state,
            isEditing: true,
            editId: _id,
            position,
            company,
            jobLocation,
            jobType,
            status,
        }
    }

    if (action.type === DELETE_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === EDIT_JOB_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === EDIT_JOB_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Job Updated!',
        }
    }

    if (action.type === EDIT_JOB_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === SHOW_STATS_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === SHOW_STATS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            stats: action.payload.stats,
            monthlyApplications: action.payload.monthlyApplications
        }
    }

    if (action.type === CLEAR_FILTERS) {
        return {
            ...state,
            search: '',
            searchStatus: 'all',
            searchType: 'all',
            sort: 'latest',
        }
    }

    if (action.type === CHANGE_PAGE) {
        return {
            ...state,
            page: action.payload.page
        }
    }

    if (action.type === GET_USERS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }

    if (action.type === GET_USERS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            users: action.payload.users,
            total: action.payload.total,
            numOfPages: action.payload.numOfPages,
        }
    }

    if (action.type === DELETE_USER_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === SET_EDIT_USER) {
        const user = state.users.find(user => user._id === action.payload.id)
        const {
            _id,
            name,
            role,
            email,
            lastName,
            location } = user
        return {
            ...state,
            isEditing: true,
            editId: _id,
            userName: name,
            userRole: role,
            userEmail: email,
            userLastname: lastName,
            userLocation: location,
        }
    }

    if (action.type === EDIT_USER_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === EDIT_USER_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'User Updated!',
        }
    }

    if (action.type === EDIT_USER_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === CREATE_EVENT_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === CREATE_EVENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New event created!',
        }
    }

    if (action.type === CREATE_EVENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_EVENTS_BEGIN) {
        return {
            ...state,
            isLoading: true,
            showAlert: false
        }
    }

    if (action.type === GET_EVENTS_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            events: action.payload.events,
            total: action.payload.total,
            numOfPages: action.payload.numOfPages,

        }
    }

    if (action.type === DELETE_EVENT_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === SET_EDIT_EVENT) {
        const event = state.events.find(event => event._id === action.payload.id)

        const {
            _id,
            name,
            description,
            company,
            location,
            date,
            img,
            coordinates,
            zoom,
            paths } = event
        return {
            ...state,
            isEditing: true,
            selectedEvent: '',
            editId: _id,
            eventName: name,
            eventDescription: description,
            eventCompany: company,
            eventLocation: location,
            eventDate: date,
            eventImg: img,
            eventCoordinates: coordinates,
            eventZoom: zoom,
            eventPaths: paths,
        }
    }

    if (action.type === EDIT_EVENT_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === EDIT_EVENT_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Event Updated!',
        }
    }

    if (action.type === EDIT_EVENT_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === GET_SINGLE_EVENT) {
        const event = state.events.find(event => event._id === action.payload.id)

        const {
            name,
            description,
            company,
            location,
            date,
            img,
            coordinates,
            zoom,
            paths } = event
        return {
            ...state,
            selectedEvent: action.payload.id,
            eventName: name,
            eventDescription: description,
            eventCompany: company,
            eventLocation: location,
            eventDate: date,
            eventImg: img,
            eventCoordinates: coordinates,
            eventZoom: zoom,
            eventPaths: paths,
        }
    }

    if (action.type === GET_ACTIVITIES_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === GET_ACTIVITIES_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            activities: action.payload.activities,
            total: action.payload.total,
            numOfPages: action.payload.numOfPages,
            allCategories: action.payload.allCategories,
        }
    }

    if (action.type === CREATE_ACTIVITY_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === CREATE_ACTIVITY_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'New activity created!',
        }
    }

    if (action.type === CREATE_ACTIVITY_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === DELETE_ACTIVITY_BEGIN) {
        return {
            ...state,
            isLoading: true,
        }
    }

    if (action.type === SET_EDIT_ACTIVITY) {
        const activity = state.activities.find(activity => activity._id === action.payload.id)


        const {
            _id,
            name,
            description,
            category,
            event_id,
            img,
            coordinates
        } = activity

        const event = state.events.find(event => event._id === event_id)
        return {
            ...state,
            isEditing: true,
            editId: _id,
            selectedEvent: '',
            activityName: name,
            activityDescription: description,
            activityCategory: category,
            activityEvent_id: event_id,
            activityImg: img,
            activityCoordinates: coordinates,
            eventCoordinates: event?.coordinates,
            eventZoom: event?.zoom,
            eventPaths: event?.paths
        }
    }

    if (action.type === EDIT_ACTIVITY_BEGIN) {
        return {
            ...state,
            isLoading: true
        }
    }

    if (action.type === EDIT_ACTIVITY_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'success',
            alertText: 'Activity Updated!',
        }
    }

    if (action.type === EDIT_ACTIVITY_ERROR) {
        return {
            ...state,
            isLoading: false,
            showAlert: true,
            alertType: 'danger',
            alertText: action.payload.msg
        }
    }

    if (action.type === CHANGE_EVENT_ID_SUCCESS) {
        return {
            ...state,
            isLoading: false,
            eventCoordinates: state.events.find(event => event._id === action.payload.id).coordinates,
            eventZoom: state.events.find(event => event._id === action.payload.id).zoom,
            eventPaths: state.events.find(event => event._id === action.payload.id).paths,
            activityCoordinates: null
        }
    }

    if (action.type === CLEAR_ACTIVITY) {
        const initialState = {
            isEditing: false,
            editId: '',
            page: 1,
            activityName: '',
            activityDescription: '',
            activityCategory: 'Comida',
            activityEvent_id: state.events[0]?._id,
            activityImg: '',
            eventCoordinates: state.events[0]?.coordinates,
            eventPaths: state.events[0]?.paths,
            eventZoom: state.events[0]?.zoom,
            activityCoordinates: null,
            activitySearchName: '',
            activitySort: 'latest',
            activityCategories: 'all',

        }
        return {
            ...state,
            ...initialState
        }
    }

    throw new Error(`no such action : ${action.type}`)
}

export default reducer