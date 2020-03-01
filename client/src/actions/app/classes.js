import { 
    PROCESSING_CLASSES, 
    NEW_CLASS, CREATE_CLASS, 
    FETCH_CLASSES_FOR_DASH, FETCH_CLASSES_BY_TERM, FETCH_CLASSES_BY_COURSE, 
    EDIT_CLASS, UPDATE_CLASS, DELETE_CLASS 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => { 
    return { 
        type: PROCESSING_CLASSES 
    }; 
};

export const newClass = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: NEW_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};

export const createClass = newClass => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/classes", newClass/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CREATE_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};

export const fetchClassesForDash = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/classes?`/*, tokenConfig(getState)*/) // add query parameters
    .then(res => dispatch({
        type: FETCH_CLASSES_FOR_DASH,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};

export const fetchClassesByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${termId}/classes`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: FETCH_CLASSES_BY_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};

export const fetchClassesByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/courses/${courseId}/classes`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_CLASSES_BY_COURSE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};

export const editClass = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/classes/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: EDIT_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};

export const updateClass = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/classes/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: UPDATE_CLASS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};

export const deleteClass = _id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.delete(`/api/v1/classes/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: DELETE_CLASS,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_CLASSES_FAILED")
    ));
};