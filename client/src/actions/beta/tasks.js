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

    axios.get(`http://localhost:3000/v1terms/${termId}/courses`, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createTask = task => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("http://localhost:3000/v1/tasks", task, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchTasks = () => (dispatch, getState) => {
    axios.get(`http://localhost:3000/v1/tasks`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchTasksByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/terms/${termId}/tasks`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_TASKS, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

// add filter
export const fetchPastTasksByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/terms/${termId}/tasks`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_PAST_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchTasksByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/courses/${courseId}/tasks`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchPastTasksByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`http://localhost:3000/v1/courses/${courseId}/tasks`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_PAST_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`http://localhost:3000/v1/tasks/${_id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: EDIT_TASK,
            payload: res.data
        });
    })
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateTask = (_id, task) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`http://localhost:3000/v1/tasks/${_id}`, task, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status))
    );
};

export const deleteTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`http://localhost:3000/v1/tasks/${_id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_TASK,
            payload: _id
        });
    })
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

