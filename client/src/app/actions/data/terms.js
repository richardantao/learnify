import { 
    TERMS_REQUESTED, 
    YEARS_FETCHED, TERM_CREATED,
    TERMS_FETCHED,
    TERM_RETURNED, TERM_UPDATED, TERM_DELETED, 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

// @path N/A
// @desc return async loading action
export const setLoading = () => { 
    return { 
        type: TERMS_REQUESTED
    }; 
};

// @path /api/v1/years
// @desc return an array of the user's years to pair the new term with
export const newTerm = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/years`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: YEARS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "TERMS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "TERMS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "TERMS_ERROR")
            );
        };
    });
};

/**
 * @param  {Object} term - 
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 */
export const createTerm = term => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post(`/api/v1/terms`, term/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TERM_CREATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "TERMS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "TERMS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "TERMS_ERROR")
            );
        };
    });
};

/**
 * @param  {string} yearId - 
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - 
 */
export const fetchTerms = yearId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/years/${yearId}/terms`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TERMS_FETCHED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "TERMS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "TERMS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "TERMS_ERROR")
            );
        };
    });
};

/**
 * @param  {string} id - 
 * @param  {function} dispatch - 
 * @param  {function} getState - 
 * @return {Object} - 
 */
export const editTerm = id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TERM_RETURNED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "TERMS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "TERMS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "TERMS_ERROR")
            );
        };
    });
};

// @path /api/v1/terms/:termId
// @desc update the given term and return it to the existing term array
export const updateTerm = (id, term) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/terms/${id}`, term/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TERM_UPDATED,
        payload: res.data
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "TERMS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "TERMS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "TERMS_ERROR")
            );
        };
    });
};

// @path /api/v1/terms/:termId
// @desc Delete the term with the specified termId and filter out the term from the user's term array
export const deleteTerm = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/terms/${id}`/*, tokenConfig(getState)*/)
    .then(res => dispatch({
        type: TERM_DELETED,
        payload: id
    }))
    .catch(err => {
        if(err.response) {
            dispatch(
                returnErrors(err.response.data, err.response.status, "TERMS_ERROR")
            );
        } else if(err.request) {
            dispatch(
                returnErrors(err.request.data, err.request.status, "TERMS_ERROR")
            );
        } else {
            dispatch(
                returnErrors("An error occurred", 500, "TERMS_ERROR")
            );
        };
    });
};