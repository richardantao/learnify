import { 
    LOADING_VIEW, RENDER_DASHBOARD, RENDER_CALENDAR, RENDER_TASKS, 
    RENDER_EVALUATIONS, RENDER_COURSES, RENDER_SEARCH, RENDER_SETTINGS, RENDER_HELP
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading= () => {
    return {
        type: LOADING_VIEW
    };
};

export const renderDashboard = () => dispatch => {
    dispatch(setLoading());

    axios.get("/dashboard")
    .then(res => dispatch({
        type: RENDER_DASHBOARD,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const renderCalendar = () => dispatch => {
    dispatch(setLoading());

    axios.get("/calendar")
    .then(res => dispatch({
        type: RENDER_CALENDAR,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const renderTasks = () => dispatch => {
    dispatch(setLoading());

    axios.get("/tasks")
    .then(res => dispatch({
        type: RENDER_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const renderEvaluations = () => dispatch => {
    dispatch(setLoading());

    axios.get("/evaluations")
    .then(res => dispatch({
        type: RENDER_EVALUATIONS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const renderCourses = () => dispatch => {
    dispatch(setLoading());

    axios.get("/courses")
    .then(res => dispatch({
        type: RENDER_COURSES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const renderSearch = () => dispatch => {
    dispatch(setLoading());

    axios.get("/search")
    .then(res => dispatch({
        type: RENDER_SEARCH,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const renderSettings = () => dispatch => {
    dispatch(setLoading());

    axios.get("/settings")
    .then(res => dispatch({
        type: RENDER_SETTINGS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const renderHelp = () => dispatch => {
    dispatch(setLoading());

    axios.get("/help")
    .then(res => dispatch({
        type: RENDER_HELP,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};