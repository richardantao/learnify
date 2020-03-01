import { 
    PROCESSING_ASSESSMENTS, 
    NEW_ASSESSMENT, CREATE_ASSESSMENT, 
    FETCH_ASSESSMENTS, FETCH_PAST_ASSESSMENTS,
    EDIT_ASSESSMENT, UPDATE_ASSESSMENT, DELETE_ASSESSMENT 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

// @path N/A
// @desc 
export const setLoading = () => { 
    return { 
        type: PROCESSING_ASSESSMENTS 
    }; 
};

// @path /api/v1/terms/:termId/courses
// @desc return an array of courses to pair with the new assessment
export const newAssessment = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_ASSESSMENT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

// @path /api/v1/assessments
// @desc send new object database and append new object ot current assessments array
export const createAssessment = newAssessment => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post(`/api/v1/assessments`, newAssessment, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_ASSESSMENT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

// @path /api/v1/terms/:termId/assessments?current=true&limit=true
// @desc Return a date-limited array of assessments
export const fetchAssessmentsForDash = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/assessments?current=true&limit=true`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

// @path /api/v1/terms/:termId/assessments?current=true&limit=false
// @desc return an array of current assessments from a given term 
export const fetchAssessmentsByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${termId}/assessments?current=true&limit=false`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

// @path /api/v1/terms/:termId/assessments?current=false&limit=false
// @desc return an array of past assessments from a given term 
export const fetchPastAssessmentsByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/assessments?current=false&limit=false`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_PAST_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

// @path /api/v1/terms/:courseId/assesments?current=true&limit=false
// @desc Return an array of assessments for the user that only has current assessments for a given course
export const fetchAssessmentsByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${courseId}/assessments?current=true&limit=false`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};


// @path /api/v1/terms/:courseId/assesments?current=false&limit=false
// @desc Return an array of assessments for the user that only has past assessments for a given course
export const fetchPastAssessmentsByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${courseId}/assessments?current=false&limit=false`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: FETCH_ASSESSMENTS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

// @path /api/v1/assessments/:assessmentId
// @desc
export const editAssessment = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/assessments/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: EDIT_ASSESSMENT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

export const updateAssessment = (id, assessment) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/assessments/${id}`, assessment/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: UPDATE_ASSESSMENT,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};

export const deleteAssessment = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/assessments/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: DELETE_ASSESSMENT,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "PROCESSING_ASSESSMENTS_FAILED")
    ));
};