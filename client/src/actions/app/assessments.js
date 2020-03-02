import { 
    ASSESSMENTS_REQUESTED,
    COURSES_FETCHED, ASSESSMENT_CREATED,
    ASSESSMENTS_FETCHED,
    ASSESSMENT_RETURNED, ASSESSMENT_UPDATED, ASSESSMENT_DELETED 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

// @path N/A
// @desc 
export const setLoading = () => { 
    return { 
        type: ASSESSMENTS_REQUESTED
    }; 
};

// @path /api/v1/terms/:termId/courses
// @desc return an array of courses to pair with the new assessment
export const newAssessment = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`, tokenConfig(getState))
    .then(res => dispatch({
        type: COURSES_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /api/v1/assessments
// @desc send new object database and append new object ot current assessments array
export const createAssessment = newAssessment => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post(`/api/v1/assessments`, newAssessment, tokenConfig(getState))
    .then(res => dispatch({
        type: ASSESSMENT_CREATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /api/v1/terms/:termId/assessments?limit=true
// @desc Return a date-limited array of assessments
export const fetchAssessmentsForDash = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/assessments?limit=true`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENTS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /apir/v1/terms/:termId/assessments?initial=true
// @desc return an array of assessments that are within the current term
export const fetchAssessmentsInitialRender = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${termId}/assessments?initial=true`, tokenConfig(getState))
    .then(res => dispatch({
        type: ASSESSMENTS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /api/v1/terms/:termId/assessments?past=true
// @desc return an array of past assessments from a given term 
export const fetchPastAssessmentsByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/assessments?past=true`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENTS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /api/v1/terms/:termId/assessments
// @desc return an array of current assessments from a given term 
export const fetchAssessmentsByTerm = termId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${termId}/assessments`, tokenConfig(getState))
    .then(res => dispatch({
        type: ASSESSMENTS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /api/v1/terms/:courseId/assesments?current=false&limit=false
// @desc Return an array of assessments for the user that only has past assessments for a given course
export const fetchPastAssessmentsByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/courses/${courseId}/assessments?past=true`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENTS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /api/v1/terms/:courseId/assesments?current=true&limit=false
// @desc Return an array of assessments for the user that only has current assessments for a given course
export const fetchAssessmentsByCourse = courseId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/courses/${courseId}/assessments`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENTS_FETCHED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

// @path /api/v1/assessments/:assessmentId
// @desc
export const editAssessment = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/assessments/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENT_RETURNED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

export const updateAssessment = (id, assessment) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/assessments/${id}`, assessment/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENT_UPDATED,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};

export const deleteAssessment = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/assessments/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENT_DELETED,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status, "ASSESSMENTS_ERROR")
    ));
};