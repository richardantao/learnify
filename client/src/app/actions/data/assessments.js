import { 
    ASSESSMENTS_REQUESTED,
    COURSES_FETCHED, ASSESSMENT_CREATED,
    ASSESSMENTS_FETCHED,
    ASSESSMENT_RETURNED, ASSESSMENT_UPDATED, ASSESSMENT_DELETED 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

/**
 * @return {Object} - action type
 */
export const setLoading = () => { 
    return { 
        type: ASSESSMENTS_REQUESTED
    }; 
};

/**
 * @param  {string} termId - ObjectId of the term to filter the fetch by 
 * @param  {function} dispatch - 
 * @param  {function} getState - retrieves token configuration
 * @return {Object} - 
 */
export const newAssessment = termId => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/terms/${termId}/courses`, tokenConfig(getState))
    .then(res => dispatch({
        type: COURSES_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ASSESSMENTS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ASSESSMENTS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ASSESSMENTS_ERROR")
            );
        };
    });
};


/**
 * @param {Object} assessment - form data as an object
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - 
 */
export const createAssessment = assessment => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post(`/api/v1/assessments`, assessment/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENT_CREATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ASSESSMENTS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ASSESSMENTS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ASSESSMENTS_ERROR")
            );
        };
    });
};
/**
 * @param  {string} parent - the parent resource with which to filter the assessments by; either 'terms' of 'courses'
 * @param  {string} parentId - ObjectId of the parent object
 * @param  {string} query - optional query parameters
 * @param  {function} dispatch - sends a dispatched action to the reducer
 * @param  {function} getState - retrieves authentication state
 * @return {Object}  - returns a async action through dispatch 
 */
export const fetchAssessments = (parent, parentId, query) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/${parent}/${parentId}/assessments${query}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENTS_FETCHED,
        payload: res.data
    }))
    .catch(err => { 
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ASSESSMENTS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ASSESSMENTS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ASSESSMENTS_ERROR")
            );
        };
    });
};

/**
 * @param  {string} id - ObjectId of the assessment to return
 * @param  {function} dispatch
 * @param  {function} getState
 * @return {Object} returns an async action through dispatch
 */
export const editAssessment = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/assessments/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENT_RETURNED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ASSESSMENTS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ASSESSMENTS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ASSESSMENTS_ERROR")
            );
        };
    });
};

/**
 * @param  {string} id - ObjectId of the
 * @param  {Object} assessment - object containing the form data that is to update the specified object
 * @param  {function} dispatch - 
 * @param  {function} getState - retrieves token configuration
 */
export const updateAssessment = (id, assessment) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/assessments/${id}`, assessment/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENT_UPDATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ASSESSMENTS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ASSESSMENTS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ASSESSMENTS_ERROR")
            );
        };
    });
};

/**
 * @param {string} id - ObjectId of the assessment to delete
 * @param  {function} dispatch - 
 * @param  {function} getState - retrives token configuration
 */
export const deleteAssessment = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/assessments/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: ASSESSMENT_DELETED,
        payload: id
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "ASSESSMENTS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "ASSESSMENTS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "ASSESSMENTS_ERROR")
            );
        };
    });
};