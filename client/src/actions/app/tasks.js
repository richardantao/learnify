import { 
    TASKS_REQUESTED,
    COURSES_FETCHED, TASK_CREATED,
    TASK_RETURNED, TASK_UPDATED, TASK_DELETED, TASKS_FETCHED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: TASKS_REQUESTED
    };
};

export const newTask = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COURSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const createTask = task => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/task", task/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TASK_CREATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const fetchTasksForDash = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/tasks/?limit=true`/*, tokenConfig(getState)*/) // add query parameters
    .then(res => dispatch({
        type: TASKS_FETCHED, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const fetchTasksInitialRender = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/tasks?initial=true`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TASKS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const fetchPastTasksByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/tasks?past=true`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TASKS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const fetchTasksByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/tasks`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TASKS_FETCHED, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const fetchPastTasksByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/courses/${courseId}/tasks?past=true`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TASKS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const fetchTasksByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/courses/${courseId}/tasks`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TASKS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const editTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/tasks/${_id}`/*, tokenConfig(getState)*/)
    .then(res => {
        dispatch({
            type: TASK_RETURNED,
            payload: res.data
        });
    })
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const updateTask = (_id, task) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/tasks/${_id}`, task/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TASK_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

export const deleteTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/tasks/${_id}`/*, tokenConfig(getState)*/)
    .then(res => {
        dispatch({
            type: TASK_DELETED,
            payload: _id
        });
    })
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "TASKS_ERROR")
    ));
};

