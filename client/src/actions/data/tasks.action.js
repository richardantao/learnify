import { 
    LOADING_TASKS, FETCH_TASKS, FETCH_PAST_TASKS, 
    NEW_TASK, CREATE_TASK, 
    EDIT_TASK, UPDATE_TASK, DELETE_TASK
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_TASKS
    };
};

export const fetchTasks = () => dispatch => {
    dispatch(setLoading());

    axios.get("/planner")
    .then(res => dispatch({
        type: FETCH_TASKS, 
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchPastTasks = () => dispatch => {
    dispatch(setLoading());

    axios.get("/planner/past")
    .then(res => dispatch({
        type: FETCH_PAST_TASKS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newTask = courses => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/planner/tasks/new", courses, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createTask = newTask => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/planner/tasks/create", newTask, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_TASK,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/planner/tasks/edit/${_id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: EDIT_TASK,
            _id,
            payload: res.data
        });
    })
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/planner/tasks/update/${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_TASK,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status))
    );
};

export const deleteTask = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/planner/tasks/delete/${_id}`, tokenConfig(getState))
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

