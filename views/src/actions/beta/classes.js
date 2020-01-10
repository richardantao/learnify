import { 
    LOADING_CLASSES, FETCH_CLASSES, 
    NEW_CLASS, CREATE_CLASS, 
    EDIT_CLASS, UPDATE_CLASS, DELETE_CLASS 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_CLASSES
    };
};

export const fetchClasses = termId => dispatch => {
    dispatch(setLoading());
    
    axios.get(`${process.env.API_HOST}/v1/terms/${termId}/classes`)
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

    axios.get(`${process.env.API_HOST}/v1/class/${_id}`, tokenConfig(getState))
    .then(res => dispatch({ 
        type: EDIT_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newClass = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`${process.env.API_HOST}/v1/terms/${termId}/courses`, tokenConfig(getState))
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

    axios.post(`${process.env.API_HOST}/v1/classes`, newClass, tokenConfig(getState))
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

    axios.put(`${process.env.API_HOST}/v1/classes/${_id}`, tokenConfig(getState))
    .then(res => dispatch({ 
        type: UPDATE_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteClass = _id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.delete(`${process.env.API_HOST}/v1/classes/${_id}`, tokenConfig(getState))
    .then(res => dispatch({ 
        type: DELETE_CLASS,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};