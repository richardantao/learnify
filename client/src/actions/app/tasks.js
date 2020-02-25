import { 
    LOADING_TASKS, FETCH_TASKS, FETCH_PAST_TASKS, 
    NEW_TASK, CREATE_TASK, 
    EDIT_TASK, UPDATE_TASK, DELETE_TASK
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_TASKS
    };
};

export const newTask = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: NEW_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const createTask = task => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/task", task/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: CREATE_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const fetchTasksForDash = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/tasks/?current=true&limit=true`/*, tokenConfig(getState)*/) // add query parameters
    .then(res => dispatch({
        // type: FETCH_TASKS, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const fetchTasksByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/tasks?current=true&limit=false`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_TASKS, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

// add filter
export const fetchPastTasksByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/tasks?current=true&limit=false`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_PAST_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const fetchTasksByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/courses/${courseId}/tasks?current=true&limit=false`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const fetchPastTasksByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/courses/${courseId}/tasks?current=false&limit=false`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_PAST_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const editTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/tasks/${_id}`/*, tokenConfig(getState)*/)
    .then(res => {
        dispatch({
            type: EDIT_TASK,
            payload: res.data
        });
    })
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

export const updateTask = (_id, task) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/tasks/${_id}`, task/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: UPDATE_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status))
    );
};

export const deleteTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/tasks/${_id}`/*, tokenConfig(getState)*/)
    .then(res => {
        dispatch({
            type: DELETE_TASK,
            payload: _id
        });
    })
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

