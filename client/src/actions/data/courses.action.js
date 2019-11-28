import { 
    LOADING_COURSES, FETCH_COURSES, 
    NEW_COURSE, CREATE_COURSE, 
    EDIT_COURSE, UPDATE_COURSE, DELETE_COURSE 
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_COURSES
    };
};

export const fetchCourses = () => dispatch => {
    dispatch(setLoading());
    
    axios.get("/academics")
    .then(res => dispatch({
        type: FETCH_COURSES,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newCourse = terms => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/academics/courses/new", terms, tokenConfig(getState))
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

    axios.post("/academics/courses/create", course, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_COURSE,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editCourse = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/academics/courses/edit/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_COURSE,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateCourse = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/academics/courses/update/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_COURSE,
        _id,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteCourse = _id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/academics/courses/delete/:${_id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_COURSE,
        payload: _id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
