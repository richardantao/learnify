import { 
    LOADING_COURSES, FETCH_COURSES, 
    NEW_COURSE, CREATE_COURSE, 
    EDIT_COURSE, UPDATE_COURSE, DELETE_COURSE 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_COURSES
    };
};

export const newCourse = yearId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`${process.env.API_HOST}/v1/years/${yearId}/terms`, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_COURSE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createCourse = course => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post(`${process.env.API_HOST}/v1/courses`, course, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_COURSE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const fetchCourses = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`${process.env.API_HOST}/v1/terms/${termId}/courses`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_COURSES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editCourse = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`${process.env.API_HOST}/v1/courses/${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_COURSE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateCourse = (_id, course) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`${process.env.API_HOST}/v1/courses/${_id}`, course, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_COURSE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteCourse = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`${process.env.API_HOST}/v1/courses/${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_COURSE,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
