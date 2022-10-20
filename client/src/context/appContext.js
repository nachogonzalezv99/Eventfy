import axios from "axios";
import { useReducer, useContext, createContext } from "react";
import reducer from "./reducer";

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
  CLEAR_ACTIVITY,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userLocation = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  isEditing: false,
  editId: "",
  total: 0,
  numOfPages: 1,
  page: 1,

  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",

  selectedEvent: "",
  eventFilter: "",
  eventName: "",
  eventDescription: "",
  eventCompany: "",
  eventLocation: userLocation || "",
  eventDate: "",
  eventImg: "",
  eventCoordinates: { lat: "0", lng: "0" },
  eventZoom: "2",
  eventPaths: [],
  events: [],

  activitySearchName: "",
  activitySort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  activityCategories: "all",

  activityName: "",
  activityDescription: "",
  activityCategory: "Comida",
  activityEvent_id: "",
  activityImg: "",
  activityCoordinates: null,
  activities: [],
  allCategories: [],

  userName: "",
  userRole: "",
  userEmail: "",
  userLastname: "",
  userLocation: "",
  users: [],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert(3000);
  };

  const clearAlert = (time) => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, time);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserToLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const setupUser = async ({ currentUser, endpoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endpoint}`,
        currentUser
      );
      const { user, token, location, role } = data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
          alertText,
          role,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert(3000);
  };

  const updateUser = async (curretUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("auth/updateUser", curretUser);
      const { user, token, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: {
          user,
          token,
          location,
        },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert(3000);
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserToLocalStorage();
  };

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.post("/jobs", {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: CREATE_JOB_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: CREATE_JOB_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert(3000);
  };

  const getJobs = async () => {
    const { search, searchStatus, searchType, sort, page } = state;
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, total, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          total,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert(3000);
  };

  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;
      await authFetch.patch(`/jobs/${state.editId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert(3000);
    }
  };

  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert(3000);
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getUsers = async () => {
    const { page } = state;
    dispatch({ type: GET_USERS_BEGIN });
    try {
      const { data } = await authFetch(`/auth?page=${page}`);
      const { users, total, numOfPages } = data;
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          users,
          total,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert(3000);
  };

  const deleteUser = async (userId) => {
    dispatch({ type: DELETE_USER_BEGIN });
    try {
      await authFetch.delete(`/auth/${userId}`);
      getUsers();
    } catch (error) {
      logoutUser();
    }
  };

  const setEditUser = (id) => {
    dispatch({ type: SET_EDIT_USER, payload: { id } });
  };

  const editUser = async () => {
    dispatch({ type: EDIT_USER_BEGIN });
    try {
      const { userName, userRole, userEmail, userLastname, userLocation } =
        state;
      await authFetch.patch(`/auth/${state.editId}`, {
        name: userName,
        role: userRole,
        email: userEmail,
        lastName: userLastname,
        location: userLocation,
      });
      dispatch({ type: EDIT_USER_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
      clearAlert(3000);
    }
  };

  const createEvent = async () => {
    dispatch({ type: CREATE_EVENT_BEGIN });
    try {
      const {
        eventName: name,
        eventDescription: description,
        eventCompany: company,
        eventLocation: location,
        eventDate: date,
        eventImg: img,
        eventCoordinates: coordinates,
        eventZoom: zoom,
        eventPaths: paths,
      } = state;

      await authFetch.post("/events", {
        name,
        description,
        company,
        location,
        date,
        img,
        coordinates,
        zoom,
        paths,
      });
      dispatch({ type: CREATE_EVENT_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: CREATE_EVENT_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      if (error.response.data.msg.length) {
        error.response.data.msg.map((err) => {
          dispatch({
            type: CREATE_EVENT_ERROR,
            payload: { msg: err.message },
          });
        });
      }
    }
    clearAlert(3000);
  };

  const getEvents = async (filtered) => {
    const { page } = state;

    dispatch({ type: GET_EVENTS_BEGIN });
    try {
      const { data } = await authFetch(`/events?page=${page}`);
      const { events, total, numOfPages } = data;
      dispatch({
        type: GET_EVENTS_SUCCESS,
        payload: {
          events,
          total,
          numOfPages,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert(3000);
  };

  const deleteEvent = async (eventId) => {
    dispatch({ type: DELETE_EVENT_BEGIN });
    try {
      await authFetch.delete(`/events/${eventId}`);
      getEvents();
    } catch (error) {
      logoutUser();
    }
  };

  const setEditEvent = (id) => {
    dispatch({ type: SET_EDIT_EVENT, payload: { id } });
  };

  const editEvent = async () => {
    dispatch({ type: EDIT_EVENT_BEGIN });
    try {
      const {
        eventName: name,
        eventDescription: description,
        eventCompany: company,
        eventLocation: location,
        eventDate: date,
        eventImg: img,
        eventCoordinates: coordinates,
        eventZoom: zoom,
        eventPaths: paths,
      } = state;
      await authFetch.patch(`/events/${state.editId}`, {
        name,
        description,
        company,
        location,
        date,
        img,
        coordinates,
        zoom,
        paths,
      });
      dispatch({ type: EDIT_EVENT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      if (error.response.data.msg.length) {
        error.response.data.msg.map((err) => {
          dispatch({
            type: EDIT_EVENT_ERROR,
            payload: { msg: err.message },
          });
        });
      }
      clearAlert(3000);
    }
  };

  const getSingleEvent = async (id) => {
    await getEvents();
    dispatch({ type: GET_SINGLE_EVENT, payload: { id } });
  };

  const getActivities = async ({ eventId, pagination }) => {
    const { page, activitySearchName, activitySort, activityCategories } =
      state;
    let url = `/activities?page=${page}&sort=${activitySort}&categories=${activityCategories}`;

    if (eventId) {
      url = url + `&event=${eventId}`;
    }
    if (activitySearchName) {
      url = url + `&search=${activitySearchName}`;
    }
    if (pagination) {
      url = url + `&pagination=${pagination}`;
    }
    dispatch({ type: GET_ACTIVITIES_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { activities, allCategories, total, numOfPages } = data;
      dispatch({
        type: GET_ACTIVITIES_SUCCESS,
        payload: {
          activities,
          total,
          numOfPages,
          allCategories,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert(3000);
  };

  const createActivity = async () => {
    dispatch({ type: CREATE_ACTIVITY_BEGIN });
    try {
      const {
        activityName: name,
        activityDescription: description,
        activityCategory: category,
        activityEvent_id: event_id,
        user,
        activityImg: img,
        activityCoordinates: coordinates,
      } = state;
      await authFetch.post("/activities", {
        name,
        description,
        category,
        user_id: user._id,
        event_id,
        img,
        coordinates,
      });
      dispatch({ type: CREATE_ACTIVITY_SUCCESS });
      clearValues();
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: CREATE_ACTIVITY_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
      if (error.response.data.msg.length) {
        error.response.data.msg.map((err) => {
          dispatch({
            type: CREATE_ACTIVITY_ERROR,
            payload: { msg: err.message },
          });
        });
      } else {
        dispatch({
          type: CREATE_ACTIVITY_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert(3000);
  };

  const deleteActivity = async (activityId) => {
    dispatch({ type: DELETE_ACTIVITY_BEGIN });
    try {
      await authFetch.delete(`/activities/${activityId}`);
      getActivities({ pagination: true });
    } catch (error) {
      logoutUser();
    }
  };

  const setEditActivity = (id) => {
    dispatch({ type: SET_EDIT_ACTIVITY, payload: { id } });
  };

  const editActivity = async () => {
    dispatch({ type: EDIT_ACTIVITY_BEGIN });
    try {
      const {
        activityName: name,
        activityDescription: description,
        activityCategory: category,
        activityEvent_id: event_id,
        activityImg: img,
        activityCoordinates: coordinates,
      } = state;
      await authFetch.patch(`/activities/${state.editId}`, {
        name,
        description,
        category,
        event_id,
        img,
        coordinates,
      });
      dispatch({ type: EDIT_ACTIVITY_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      if (error.response.data.msg.length) {
        error.response.data.msg.map((err) => {
          dispatch({
            type: EDIT_EVENT_ERROR,
            payload: { msg: err.message },
          });
        });
      }
      clearAlert(3000);
      clearAlert(3000);
    }
  };

  const changeEventId = async (id) => {
    dispatch({ type: CHANGE_EVENT_ID_SUCCESS, payload: { id } });
  };

  const clearActivity = () => {
    dispatch({ type: CLEAR_ACTIVITY });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        clearAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage,
        getUsers,
        deleteUser,
        setEditUser,
        editUser,
        createEvent,
        getEvents,
        deleteEvent,
        setEditEvent,
        editEvent,
        getSingleEvent,
        getActivities,
        createActivity,
        deleteActivity,
        setEditActivity,
        editActivity,
        changeEventId,
        clearActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
