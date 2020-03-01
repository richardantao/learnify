import { 
    CLASSES_REQUESTED,
    COURSES_FETCHED, CLASS_CREATED, 
    CLASSES_FETCHED,
    CLASS_RETURNED, CLASS_UPDATED, CLASS_DELETED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => { 
    return { 
        type: CLASSES_REQUESTED
    }; 
};

export const newClass = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: COURSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const createClass = newClass => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/classes", newClass/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_CREATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const fetchClassesForDash = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/classes?`/*, tokenConfig(getState)*/) // add query parameters
    .then(res => dispatch({
        type: CLASSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const fetchClassesByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${termId}/classes`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const fetchClassesByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/courses/${courseId}/classes`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: CLASSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const editClass = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/classes/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const updateClass = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/classes/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};

export const deleteClass = _id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.delete(`/api/v1/classes/${_id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({ 
        type: CLASS_DELETED,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "CLASSES_ERROR")
    ));
};