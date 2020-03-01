import { 
    COURSES_REQUESTED, 
    TERMS_FETCHED, COURSE_CREATED,
    COURSE_RETURNED, COURSE_UPDATED, COURSE_DELETED, COURSES_FETCHED
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

// @path N/A
// @desc 
export const setLoading = () => { 
    return { 
        type: COURSES_REQUESTED
    }; 
};

// @path /api/v1/years/:yearId/terms
// @desc return an array of user's terms to pair with the new course
export const newCourse = yearId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/years/${yearId}/terms`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TERMS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "COURSES_ERROR")
    ));
};

// @path /api/v1/courses
// @desc send new course object to backend and append course to user's course array
export const createCourse = course => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/api/v1/courses", course/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COURSE_CREATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "COURSES_ERROR")
    ));
};

// @path /api/v1/terms/:termId/courses
// @desc return an array of courses that contain the specified termId
export const fetchCourses = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${termId}/courses`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COURSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "COURSES_ERROR")
    ));
};

// @path /api/v1/courses/:courseId
// @desc return course object with the specified termId
export const editCourse = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/courses/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COURSE_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "COURSES_ERROR")
    ));
};

// @path /api/v1/courses/:courseId
// @desc Send updated object to backend and return updated object the user's course array
export const updateCourse = (id, course) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/courses/${id}`, course/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COURSE_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "COURSES_ERROR")
    ));
};

// @path /api/v1/courses/:courseId
/* @desc delete course object with the specified courseId from the backend and filter out 
    from user's course array */
export const deleteCourse = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/courses/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: COURSE_DELETED,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "COURSES_ERROR")
    ));
};
