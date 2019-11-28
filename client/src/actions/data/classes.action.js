import { 
    LOADING_CLASSES, FETCH_CLASSES, 
    NEW_CLASS, CREATE_CLASS, 
    EDIT_CLASS, UPDATE_CLASS, DELETE_CLASS 
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_CLASSES
    };
};

export const fetchClasses = () => dispatch => {
    dispatch(setLoading());
    
    axios.get("/calendar")
    .then(res => dispatch({ 
        type: FETCH_CLASSES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editClass = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/calendar/edit/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({ 
        type: EDIT_CLASS,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newClass = courses => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/calendar/new", courses, tokenConfig(getState))
    .then(res => dispatch({ 
        type: NEW_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createClass = newClass => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/calendar/create", newClass, tokenConfig(getState))
    .then(res => dispatch({ 
        type: CREATE_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateClass = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/calendar/update/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({ 
        type: UPDATE_CLASS,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteClass = _id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.delete(`/calendar/delete/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({ 
        type: DELETE_CLASS,
        _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};