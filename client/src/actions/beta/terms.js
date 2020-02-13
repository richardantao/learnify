import { 
    LOADING_TERMS, 
    FETCH_TERMS, EDIT_TERM, 
    NEW_TERM, CREATE_TERM, 
    UPDATE_TERM, DELETE_TERM 
} from "../types";
import { tokenConfig } from "../auth/auth";
import { returnErrors } from "../auth/errors";
import axios from "axios";

// @path N/A
// @desc return async loading action
export const setLoading = () => { return { type: LOADING_TERMS } };

// @path /api/v1/years
// @desc return an array of the user's years to pair the new term with
export const newTerm = () => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get(`/api/v1/years`, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

// @path /api/v1/terms
// @desc save new term object to backend and append object to user's term array
export const createTerm = term => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post(`/api/v1/terms`, term, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

// @path /api/v1/years/:yearId/terms
// @desc fetch all the user's terms that contain the given yearId
export const fetchTerms = yearId => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/years/${yearId}/terms`, tokenConfig(getState))
    .then(res => dispatch({
        type: FETCH_TERMS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

// @path /api/v1/terms/:termId
// @desc return the term object with the given termId
export const editTerm = id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/api/v1/terms/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

// @path /api/v1/terms/:termId
// @desc update the given term and return it to the existing term array
export const updateTerm = (id, term) => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/api/v1/terms/${id}`, term, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};

// @path /api/v1/terms/:termId
// @desc Delete the term with the specified termId and filter out the term from the user's term array
export const deleteTerm = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/api/v1/terms/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_TERM,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.res.data, err.res.status)
    ));
};