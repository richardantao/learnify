import { 
    LOADING_TERMS, 
    FETCH_TERMS, EDIT_TERM, 
    NEW_TERM, CREATE_TERM, 
    UPDATE_TERM, DELETE_TERM 
} from "../types";
import { tokenConfig } from "../auth/auth.action";
import { returnErrors } from "../auth/errors.action";
import axios from "axios";

export const setLoading = () => {
    return {
        type: LOADING_TERMS
    };
};

export const fetchTerms = () => dispatch => {
    dispatch(setLoading());
    
    axios.get("/courses")
    .then(res => dispatch({
        type: FETCH_TERMS,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const editTerm = id => (dispatch, getState) => {
    dispatch(setLoading());
    
    axios.get(`/courses/terms/edit/:${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: EDIT_TERM,
        payload: id // verify
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const newTerm = years => (dispatch, getState) => {
    dispatch(setLoading());

    axios.get("/courses/terms/new", years, tokenConfig(getState))
    .then(res => dispatch({
        type: NEW_TERM,
        payload: res.data // change to pass parent years as payload
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const createTerm = newTerm => (dispatch, getState) => {
    dispatch(setLoading());

    axios.post("/courses/terms/create", newTerm, tokenConfig(getState))
    .then(res => dispatch({
        type: CREATE_TERM,
        payload: res.data
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const updateTerm = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.put(`/courses/terms/update/:${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: UPDATE_TERM,
        payload: id // verify
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};

export const deleteTerm = id => (dispatch, getState) => {
    dispatch(setLoading());

    axios.delete(`/courses/terms/delete/:${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DELETE_TERM,
        payload: id
    }))
    .catch(err => dispatch(
        returnErrors(err.data, err.status)
    ));
};
